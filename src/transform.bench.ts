import fs from "node:fs";
import assert from "node:assert";
import { bench, describe } from "vitest";
import { transformSync as swcTransform } from "@swc/core";
import { transformSync as babelTransform } from "@babel/core";
import { transform as oxcTransform } from "oxc-transform";

type RunOptions = {
  filename: string;
  sourceText: string;
  sourceMap: boolean;
  reactDev: boolean;
  target: 'esnext' | 'es2015'
};

function oxc(options: RunOptions) {
  return oxcTransform(options.filename, options.sourceText, {
    sourcemap: options.sourceMap,
    target: options.target,
    react: {
      runtime: "automatic",
      development: options.reactDev,
      refresh: options.reactDev ? {} : undefined,
    },
  });
}

function swc(options: RunOptions) {
  return swcTransform(options.sourceText, {
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
  });
}

function babel(options: RunOptions) {
  return babelTransform(options.sourceText, {
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
  })!;
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
  (filename, sourceMap, reactDev, target, sourceText) => {
    for (const fn of [oxc, swc, babel]) {
      const options: RunOptions = { filename, sourceText, sourceMap, reactDev, target };
      const code = fn(options).code;
      // fs.writeFileSync(`./output/${filename}.${fn.name}.js`, code);
      assert(code);
      bench(fn.name, () => void fn(options));
    }
  },
);
