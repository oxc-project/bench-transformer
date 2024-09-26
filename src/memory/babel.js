import fs from "fs";
import { transformSync as babelTransform } from '@babel/core'
let filename = "./fixtures/parser.ts";
const sourceText = fs.readFileSync(filename, "utf8");
babelTransform(sourceText, {
  filename,
  babelrc: false,
  comments: false,
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: 'automatic' }],
  ]
});
