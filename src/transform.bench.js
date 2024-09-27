import fs from "fs";
import assert from "assert";
import { bench, describe } from "vitest";
import { transformSync as swcTransform } from "@swc/core";
import { transformSync as babelTransform } from '@babel/core'
import { transform as oxcTransform } from "oxc-transform";

const development = false;
const refresh = false;

function oxc(filename, sourceText) {
  return oxcTransform(filename, sourceText, {
    react: {
      runtime: 'automatic',
      development,
      refresh
    }
  });
}

function swc(filename, sourceText) {
  return swcTransform(sourceText, {
    filename,
    swcrc: false,
    jsc: {
      target: "esnext",
      transform: {
        treatConstEnumAsEnum: true,
        react: {
          runtime: 'automatic',
          development,
          refresh,
        }
      },
      preserveAllComments: false,
    }
  });
}

function babel(filename, sourceText) {
  return babelTransform(sourceText, {
    filename,
    babelrc: false,
    comments: false,
    envName: 'development',
    plugins: refresh ? [ "react-refresh/babel" ] : [],
    presets: [
      "@babel/preset-typescript",
      ["@babel/preset-react", { runtime: 'automatic', development }],
    ]
  });
}

const sources = fs.readdirSync("./fixtures")
.map((filename) => {
  const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
  return [filename, sourceText];
});

describe.each(sources)('%s', (filename, sourceText) => {
  for (const fn of [oxc, swc, babel]) {
    const code = fn(filename, sourceText).code;
    // fs.writeFileSync(`./output/${filename}.${fn.name}.js`, code);
    assert(code);
    bench(fn.name, () => fn(filename, sourceText));
  }
});
