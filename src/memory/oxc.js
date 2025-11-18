import fs from "fs";
import { transformSync } from "oxc-transform";
let filename = "./fixtures/parser.ts";
const sourceText = fs.readFileSync(filename, "utf8");
transformSync(filename, sourceText);
