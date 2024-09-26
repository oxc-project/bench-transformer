import fs from "fs";
import assert from "assert";
import { bench, describe } from "vitest";
import { transpileDeclaration } from "typescript";
import { isolatedDeclaration } from "oxc-transform";

function oxc(filename, sourceText) {
  return isolatedDeclaration(filename, sourceText).code;
}

function tsc(fileName, sourceText) {
  return transpileDeclaration(sourceText, { fileName }).outputText;
}

const sources = fs.readdirSync("./fixtures")
  .map((filename) => {
    const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
    return [filename, sourceText];
  });

describe.each(sources)('%s', (filename, sourceText) => {
  for (const fn of [oxc, tsc]) {
    const code = fn(filename, sourceText);
    // fs.writeFileSync(`./output/${filename}.${fn.name}.js`, code);
    assert(code);
    bench(fn.name, () => fn(filename, sourceText));
  }
});
