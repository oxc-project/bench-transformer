# Bench Oxc, Swc, and Babel Transformer

## Transform / Transpile

Oxc is 4x faster than swc, and 40x faster than Babel.

### MacBook Pro M3 Max

```
 BENCH  Summary

  oxc - src/transform.bench.js > parser.ts
    3.94x faster than swc
    43.64x faster than babel

  oxc - src/transform.bench.js > renderer.ts
    3.98x faster than swc
    41.86x faster than babel

  oxc - src/transform.bench.js > table.tsx
    4.28x faster than swc
    36.14x faster than babel
```

## Isolated Declarations DTS Emit

Oxc is 4x faster than tsc on small files, and 10x faster on larger files.

### MacBook Pro M3 Max

```
 BENCH  Summary

  oxc - src/id.bench.js > parser.ts
    14.81x faster than tsc

  oxc - src/id.bench.js > renderer.ts
    15.19x faster than tsc

  oxc - src/id.bench.js > table.tsx
    4.43x faster than tsc
```

## Fixtures

* parser.ts (525K, 10777 lines) - https://github.com/microsoft/TypeScript/blob/main/src/compiler/parser.ts
* renderer.ts (70K, 2550 lines) - https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts
* table.ts (30K, 1117 lines) - https://github.com/toeverything/AFFiNE/blob/canary/packages/common/infra/src/orm/core/table.ts

### NOTE:

Babel's code generator deoptimised the styling for large files and reports.

> [BABEL] Note: The code generator has deoptimised the styling of parser.ts as it exceeds the max of 500KB.

I wanted to benchmark the `checker.ts`, but Babel failed to parse:

```
TypeError: Duplicate declaration "SymbolLinks"
  1425 | }));
  1426 |
> 1427 | const SymbolLinks = class implements SymbolLinks {
       |       ^^^^^^^^^^^
  1428 |     declare _symbolLinksBrand: any;
  1429 | };
  1430 |
```
