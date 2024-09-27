# Bench Oxc, Swc, and Babel Transformer

## Summary

* For transform, oxc is 4x faster than swc, uses 20% less memory, and is 35 MB smaller in package size (from swc's 37MB).
* For transform, oxc is 40x faster than babel, uses 70% less memory, and is 19 MB smaller with 168 npm packages less to install.
* For react development + refresh, oxc is 6x faster than swc and 70x faster than Babel.
* For tsc's isolated declarations dts emit, oxc is 45x faster on ordinary files, and 20x faster on larger files.

## Transform / Transpile

Oxc is 4x faster than swc, and 40x faster than Babel.

React development + refresh is 6x faster than swc and 70x faster Babel.

### GitHub Actions `ubuntu-latest`

```
  oxc - src/transform.bench.js > UserSettings.tsx
    5.62x faster than swc
    69.64x faster than babel

  oxc - src/transform.bench.js > parser.ts
    3.72x faster than swc
    54.70x faster than babel

  oxc - src/transform.bench.js > renderer.ts
    3.96x faster than swc
    30.35x faster than babel

  oxc - src/transform.bench.js > table.tsx
    4.54x faster than swc
    59.54x faster than babel
```

### MacBook Pro M3 Max

```
  oxc - src/transform.bench.js > UserSettings.tsx
    6.90x faster than swc
    56.93x faster than babel

  oxc - src/transform.bench.js > parser.ts
    4.01x faster than swc
    42.31x faster than babel

  oxc - src/transform.bench.js > renderer.ts
    3.76x faster than swc
    27.47x faster than babel

  oxc - src/transform.bench.js > table.tsx
    3.94x faster than swc
    33.74x faster than babel
```

#### React Development + Refresh

```
  oxc - src/transform.bench.js > UserSettings.tsx
    7.16x faster than swc
    75.47x faster than babel

  oxc - src/transform.bench.js > parser.ts
    4.03x faster than swc
    51.63x faster than babel

  oxc - src/transform.bench.js > renderer.ts
    3.86x faster than swc
    33.55x faster than babel

  oxc - src/transform.bench.js > table.tsx
    4.18x faster than swc
    45.02x faster than babel
```

## Isolated Declarations DTS Emit

Oxc is 45x faster than `tsc` on ordinary files, and 20x faster on larger files.

### GitHub Actions `ubuntu-latest`

```
  oxc - src/id.bench.js > UserSettings.tsx
    45.05x faster than tsc

  oxc - src/id.bench.js > parser.ts
    20.42x faster than tsc

  oxc - src/id.bench.js > renderer.ts
    21.70x faster than tsc

  oxc - src/id.bench.js > table.tsx
    7.24x faster than tsc
```


### MacBook Pro M3 Max

```
  oxc - src/id.bench.js > UserSettings.tsx
    37.16x faster than tsc

  oxc - src/id.bench.js > parser.ts
    19.08x faster than tsc

  oxc - src/id.bench.js > renderer.ts
    18.05x faster than tsc

  oxc - src/id.bench.js > table.tsx
    4.40x faster than tsc
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
* [cal.com/apps/web/components/getting-started/steps-views/UserSettings.tsx](https://github.com/calcom/cal.com/blob/20729b3a4e62c52f49419d2c3b30225f0c7a5936/apps/web/components/getting-started/steps-views/UserSettings.tsx) - a typical 124 lines of tsx code.

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
