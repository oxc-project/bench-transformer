import fs from "fs";
import assert from "assert";
import { bench, describe } from "vitest";
import { transpileDeclaration } from "typescript";
import { isolatedDeclaration } from "oxc-transform";

const fileName = "test.ts";

function oxc(sourceText) {
  return isolatedDeclaration(fileName, sourceText);
}

function tsc(sourceText) {
  return transpileDeclaration(sourceText, { fileName, compilerOptions: { strict: true } });
}

const sources = fs.readdirSync("./fixtures").map((filename) => {
  const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
  return [filename, sourceText];
});

describe.each(sources)('%s', (_, sourceText) => {
  const oxcResult = oxc(sourceText);
  assert(oxcResult.sourceText);

  const tscResult = tsc(sourceText);
  assert(tscResult.outputText);

  bench("oxc.isolatedDeclaration", () => {
    oxc(sourceText);
  });

  bench("typescript.transpileDeclaration", () => {
    tsc(sourceText);
  });
});
