import fs from "node:fs";
import assert from "node:assert";
import { bench, describe } from "vitest";
import { transformSync as swcTransform, transform as swcTransformAsync, type Options as SwcTransformOptions } from "@swc/core";
import { transformSync as babelTransform, transformAsync as babelTransformAsync, type TransformOptions as BabelTransformOptions } from "@babel/core";
import { transformSync as oxcTransform, transform as oxcTransformAsync, type TransformOptions as OxcTransformOptions } from "oxc-transform";

const CONCURRENT_RUN_COUNT = 5;

type RunOptions = {
  filename: string;
  sourceText: string;
  sourceMap: boolean;
  reactDev: boolean;
  target: 'esnext' | 'es2015'
};

function getOxcOptions(options: RunOptions): OxcTransformOptions {
  return {
    sourcemap: options.sourceMap,
    target: options.target,
    react: {
      runtime: "automatic",
      development: options.reactDev,
      refresh: options.reactDev ? {} : undefined,
    },
  }
}

function oxc(options: RunOptions) {
  return oxcTransform(options.filename, options.sourceText, getOxcOptions(options));
}

async function oxcAsync(options: RunOptions) {
  return await oxcTransformAsync(options.filename, options.sourceText, getOxcOptions(options));
}

function getSwcOptions(options: RunOptions): SwcTransformOptions {
  return {
    filename: options.filename,
    sourceMaps: options.sourceMap,
    swcrc: false,
    jsc: {
      target: options.target,
      transform: {
        treatConstEnumAsEnum: true,
        react: {
          runtime: "automatic",
          development: options.reactDev,
          refresh: options.reactDev,
        },
      },
      preserveAllComments: false,
      experimental: {
        disableAllLints: true
      }
    },
  }
}

function swc(options: RunOptions) {
  return swcTransform(options.sourceText, getSwcOptions(options));
}

async function swcAsync(options: RunOptions) {
  return await swcTransformAsync(options.sourceText, getSwcOptions(options));
}

function getBabelOptions(options: RunOptions): BabelTransformOptions {
  return {
    filename: options.filename,
    sourceMaps: options.sourceMap,
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    comments: false,
    compact: false,
    envName: "development",
    plugins: options.reactDev ? ["react-refresh/babel"] : [],
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-react",
        { runtime: "automatic", development: options.reactDev },
      ],
    ],
  }
}

function babel(options: RunOptions) {
  return babelTransform(options.sourceText, getBabelOptions(options))!;
}

async function babelAsync(options: RunOptions) {
  return (await babelTransformAsync(options.sourceText, getBabelOptions(options)))!;
}

type Case = [
  filename: RunOptions['filename'],
  sourceMap: RunOptions['sourceMap'],
  reactDev: RunOptions['reactDev'],
  target: RunOptions['target'],
  sourceText: RunOptions['sourceText'],
];
const cases = fs.readdirSync("./fixtures").flatMap((filename): Case[] => {
  const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
  const base: Case[] = [
    [filename, false, false, "esnext", sourceText],
    [filename, false, false, "es2015", sourceText],
    [filename, true, false, "esnext", sourceText],
  ];
  if (!filename.endsWith(".tsx")) return base;
  return [
    ...base,
    [filename, false, true, "esnext", sourceText],
    [filename, true, true, "esnext", sourceText],
  ];
});

describe.each(cases)(
  "%s (sourceMap: %s, reactDev: %s, target: %s)",
  async (filename, sourceMap, reactDev, target, sourceText) => {
    for (const fn of [oxc, swc, babel]) {
      const options: RunOptions = { filename, sourceText, sourceMap, reactDev, target };
      const code = fn(options).code;
      // fs.writeFileSync(`./output/${filename}.${fn.name}.js`, code);
      assert(code);
      bench(fn.name, () => {
        for (let i = 0; i < CONCURRENT_RUN_COUNT; i++) {
          void fn(options)
        }
      });
    }

    if (!sourceMap && !reactDev && target === "es2015") {
      for (const fn of [oxcAsync, swcAsync, babelAsync]) {
        const options: RunOptions = { filename, sourceText, sourceMap, reactDev, target };
        const code = (await fn(options)).code;
        // fs.writeFileSync(`./output/${filename}.${fn.name}.js`, code);
        assert(code);
        bench(fn.name, async () => {
          for (let i = 0; i < CONCURRENT_RUN_COUNT; i++) {
            await fn(options);
          }
        });
        bench(fn.name + ' (Promise.all)', async () => {
          const arr = [];
          for (let i = 0; i < CONCURRENT_RUN_COUNT; i++) {
            arr.push(fn(options));
          }
          await Promise.all(arr);
        });
      }
    }
  },
);
