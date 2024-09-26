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

### Memory Usage

On `parser.ts` by using `/usr/bin/time -alh node`:

|       | Max RSS |
| ---   | ------- |
| oxc   | 51 MB   |
| swc   | 67MB    |
| babel | 172MB   |

## Fixtures

* [TypeScript/src/compiler/parser.ts](https://github.com/microsoft/TypeScript/blob/3ad0f752482f5e846dc35a69572ccb43311826c0/src/compiler/parser.ts) - an atypical large file with 10777 lines.
* [vuejs/core/packages/runtime-core/src/renderer.ts](https://github.com/vuejs/core/blob/cb34b28a4a9bf868be4785b001c526163eda342e/packages/runtime-core/src/renderer.ts) - somewhat large library file with 2550 lines.
* [AFFiNE/packages/frontend/core/src/components/affine/page-properties/table.tsx](https://github.com/toeverything/AFFiNE/blob/a9b29d24f1f6e5563e43a11b5cbcfb30c9981d25/packages/frontend/core/src/components/affine/page-properties/table.tsx) - a tsx file with 1118 lines.

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
