import fs from "fs";
import assert from "assert";
import { bench, describe } from "vitest";
import { transpileDeclaration } from "typescript";
// import { isolatedDeclaration } from "oxc-transform";
import { isolatedDeclaration } from "@oxc-transform/binding";

const fileName = "test.ts";

function oxc(sourceText) {
  return isolatedDeclaration(fileName, sourceText);
}

function tsc(sourceText) {
  return transpileDeclaration(sourceText, { fileName });
}

const sources = fs.readdirSync("./fixtures").map((filename) => {
  const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
  return [filename, sourceText];
});

sources.forEach(([filename, sourceText]) => {
  describe(filename, () => {
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
});
