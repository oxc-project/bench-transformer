import fs from "fs";
import assert from "assert";
import { bench, describe } from "vitest";
import { transformSync as swcTransform } from "@swc/core";
import { transform as oxcTransform } from "oxc-transform";

function oxc(filename, sourceText) {
  return oxcTransform(filename, sourceText);
}

function swc(filename, sourceText) {
  return swcTransform(sourceText,
    {
      filename,
      env: {
        targets: "last 1 Chrome versions"
      }
    });
}

const sources = fs.readdirSync("./fixtures")
  .filter((filename)=> filename.includes("typescript"))
  .map((filename) => {
  const sourceText = fs.readFileSync(`./fixtures/${filename}`, "utf8");
  return [filename, sourceText];
});

describe.each(sources)('%s', (filename, sourceText) => {
  console.log(filename)
  const oxcResult = oxc(filename, sourceText);
  assert(oxcResult.code);

  const swcResult = swc(filename, sourceText);
  assert(swcResult.code);

  bench("oxc.transform", () => {
    oxc(filename, sourceText);
  });

  bench("swc.transform", () => {
    swc(filename, sourceText);
  });
});
