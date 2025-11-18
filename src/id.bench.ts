import fs from "node:fs";
import assert from "node:assert";
import { bench, describe } from "vitest";
import { transpileDeclaration } from "typescript";
import { isolatedDeclarationSync } from "oxc-transform";

function oxc(filename: string, sourceText: string) {
  return isolatedDeclarationSync(filename, sourceText).code;
}

function tsc(fileName: string, sourceText: string) {
  return transpileDeclaration(sourceText, {
    fileName,
    compilerOptions: { noResolve: true, noLib: true },
  }).outputText;
}

const sources = fs.readdirSync("./fixtures").map((filename) => {
  const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
  return [filename, sourceText];
});

describe.each(sources)("%s", (filename, sourceText) => {
  for (const fn of [oxc, tsc]) {
    const code = fn(filename, sourceText);
    // fs.writeFileSync(`./output/${filename}.${fn.name}.js`, code);
    assert(code);
    bench(fn.name, () => void fn(filename, sourceText));
  }
});
