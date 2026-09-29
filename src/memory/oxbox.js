import fs from "fs";
import { transformSync } from "oxbox";
let filename = "./fixtures/parser.ts";
const sourceText = fs.readFileSync(filename, "utf8");
transformSync(filename, sourceText);
