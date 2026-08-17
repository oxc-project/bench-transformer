import assert from "node:assert";
import fs from "node:fs";
import { transformSync as babelTransform } from "@babel/core";
import babelPluginReactCompiler from "babel-plugin-react-compiler";
import {
  transformSync as oxcTransform,
  type TransformOptions as OxcTransformOptions,
} from "oxc-transform-react";
import { bench, describe } from "vite-plus/test";

const CONCURRENT_RUN_COUNT = 5;
const filenames = ["UserSettings.tsx", "table.tsx"];

const oxcOptions: OxcTransformOptions = {
  jsx: "preserve",
  reactCompiler: { target: "19" },
};

function getBabelOptions(filename: string): NonNullable<Parameters<typeof babelTransform>[1]> {
  return {
    filename,
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    comments: false,
    parserOpts: { plugins: ["typescript", "jsx"] },
    plugins: [[babelPluginReactCompiler, { target: "19" }]],
  };
}

const cases = filenames.map((filename) => {
  const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
  return [filename, sourceText] as const;
});

describe.each(cases)("%s", (filename, sourceText) => {
  const babelOptions = getBabelOptions(filename);

  const transforms = [
    ["oxc-transform-react", () => oxcTransform(filename, sourceText, oxcOptions)],
    ["babel-plugin-react-compiler", () => babelTransform(sourceText, babelOptions)],
  ] as const;

  const oxcResult = transforms[0][1]();
  assert(!oxcResult.fatal, oxcResult.errors.map((error) => error.message).join("\n"));
  assert(oxcResult.code);
  assert(transforms[1][1]()?.code);

  for (const [name, transform] of transforms) {
    bench(name, () => {
      for (let i = 0; i < CONCURRENT_RUN_COUNT; i++) {
        void transform();
      }
    });
  }
});
