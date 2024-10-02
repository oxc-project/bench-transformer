import fs from "fs";
import { transformSync as swcTransform } from "@swc/core";
let filename = "./fixtures/parser.ts";
const sourceText = fs.readFileSync(filename, "utf8");
swcTransform(sourceText, {
  filename,
  swcrc: false,
  jsc: {
    target: "esnext",
    transform: {
      treatConstEnumAsEnum: true,
      react: {
        runtime: 'automatic'
      }
    },
    preserveAllComments: false,
    experimental: {
      disableAllLints: true,
    },
  }
});
