import fs from "fs";
import { transform as oxcTransform } from "oxc-transform";
let filename = "./fixtures/parser.ts";
const sourceText = fs.readFileSync(filename, "utf8");
oxcTransform(filename, sourceText);
