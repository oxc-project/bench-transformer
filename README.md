# Bench Oxc, Swc, and Babel Transformer

## Summary

* Compared to swc, oxc transformer is 4x faster, uses 20% less memory, and is 35 MB smaller in package size (from swc's 37MB).
* Compared to babel, oxc transformer is 40x faster, uses 70% less memory, and is 19 MB smaller with 168 npm packages less to install.
<!-- * Compared to tsc's isolated declarations dts emit, oxc is x times faster. -->

## Transform / Transpile

Oxc is 4x faster than swc, and 40x faster than Babel.

### MacBook Pro M3 Max

```
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

### GitHub Actions `ubuntu-latest`

```
  oxc - src/transform.bench.js > parser.ts
    4.02x faster than swc
    47.41x faster than babel

  oxc - src/transform.bench.js > renderer.ts
    4.09x faster than swc
    27.14x faster than babel

  oxc - src/transform.bench.js > table.tsx
    4.63x faster than swc
    44.04x faster than babel
```

## Isolated Declarations DTS Emit

Oxc is 4x faster than tsc on small files, and 10x faster on larger files.

### MacBook Pro M3 Max

```
  oxc - src/id.bench.js > parser.ts
    14.81x faster than tsc

  oxc - src/id.bench.js > renderer.ts
    15.19x faster than tsc

  oxc - src/id.bench.js > table.tsx
    4.43x faster than tsc
```

### GitHub Actions `ubuntu-latest`

```
  oxc - src/id.bench.js > parser.ts
    18.00x faster than tsc

  oxc - src/id.bench.js > renderer.ts
    22.37x faster than tsc

  oxc - src/id.bench.js > table.tsx
    8.06x faster than tsc
```

### Memory Usage

On `parser.ts` by using `/usr/bin/time -alh node`:

|       | Max RSS |
| ---   | ------- |
| oxc   | 51 MB   |
| swc   | 67 MB    |
| babel | 172 MB   |

## Package size

For package download size, oxc downloads 2 packages for around a total of 2MB.

| Package                                                                                  | Size                                                                                       |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `@oxc-transform/binding-darwin-arm64`                                                    | [1.95 MB](https://www.npmjs.com/package/@oxc-transform/binding-darwin-arm64)                |
| `@swc/core-darwin-arm64`                                                                 | [37.5 MB](https://www.npmjs.com/package/@swc/core-darwin-arm64)                             |
| `@babel/core` + `@babel/preset-env` + `@babel/preset-react` + `@babel/preset-typescript` | [21MB and 170 packages](https://www.npmjs.com/package/@oxc-transform/binding-darwin-arm64) |

## Fixtures

* [TypeScript/src/compiler/parser.ts](https://github.com/microsoft/TypeScript/blob/3ad0f752482f5e846dc35a69572ccb43311826c0/src/compiler/parser.ts) - an atypical large file with 10777 lines.
* [vuejs/core/packages/runtime-core/src/renderer.ts](https://github.com/vuejs/core/blob/cb34b28a4a9bf868be4785b001c526163eda342e/packages/runtime-core/src/renderer.ts) - somewhat large library file with 2550 lines.
* [AFFiNE/packages/frontend/core/src/components/affine/page-properties/table.tsx](https://github.com/toeverything/AFFiNE/blob/a9b29d24f1f6e5563e43a11b5cbcfb30c9981d25/packages/frontend/core/src/components/affine/page-properties/table.tsx) - a tsx file with 1118 lines.

### NOTE:

Babel's code generator deoptimised the styling for large files and reports:

> [BABEL] Note: The code generator has deoptimised the styling of parser.ts as it exceeds the max of 500KB.

I intended to benchmark `checker.ts` from tsc, but Babel failed to parse:

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
