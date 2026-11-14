import fs from "node:fs";
import assert from "node:assert";
import { describe, test } from "vite-plus/test";
import { transpileDeclaration } from "@typescript/typescript6";
import { isolatedDeclarationSync as oxboxIsolatedDeclarationSync } from "oxbox";
import { isolatedDeclarationSync } from "oxc-transform";

function oxc(filename: string, sourceText: string) {
  return isolatedDeclarationSync(filename, sourceText).code;
}

function oxbox(filename: string, sourceText: string) {
  return oxboxIsolatedDeclarationSync(filename, sourceText).code;
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
  test("isolated declarations", { timeout: 0 }, async ({ bench }) => {
    const benchmarks = [oxc, oxbox, tsc].map((fn) => {
      const code = fn(filename, sourceText);
      // fs.writeFileSync(`./output/${filename}.${fn.name}.js`, code);
      assert(code);
      return bench(fn.name, () => void fn(filename, sourceText));
    });
    await bench.compare(...benchmarks);
  });
});
