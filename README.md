# Bench Oxc, Swc, and Babel Transformer

## Summary

- Transform: Oxc is 3x - 5x faster than SWC, uses 20% less memory, and has smaller package size (2 MB vs SWC's 37 MB).
- Transform: Oxc is 20x - 50x faster than Babel, uses 70% less memory, and is 19 MB smaller, with only 2 npm packages to install vs Babel's 170.
- React development + React Refresh: Oxc is 5x faster than SWC, 50x faster than Babel.
- TS isolated declarations `.d.ts` emit: Oxc is 40x faster than TSC on typical files, 20x faster on larger files.

## Transform / Transpile

Oxc is 3x - 5x faster than swc, and 20x - 50x faster than Babel.

React development + refresh is 6x faster than swc and 20x - 70x faster than Babel.

### GitHub Actions `ubuntu-latest`

```
  oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: false, reactDev: false, target: esnext)
    4.18x faster than swc
    49.04x faster than babel
  oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: false, reactDev: false, target: es2015)
    5.71x faster than swc
    46.49x faster than babel
  oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: true, reactDev: false, target: esnext)
    4.23x faster than swc
    40.18x faster than babel
  oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: false, reactDev: true, target: esnext)
    5.41x faster than swc
    64.39x faster than babel
  oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: true, reactDev: true, target: esnext)
    5.17x faster than swc
    53.43x faster than babel
  oxc - src/transform.bench.ts > parser.ts (sourceMap: false, reactDev: false, target: esnext)
    3.13x faster than swc
    34.59x faster than babel
  oxc - src/transform.bench.ts > parser.ts (sourceMap: false, reactDev: false, target: es2015)
    3.51x faster than swc
    31.86x faster than babel
  oxc - src/transform.bench.ts > parser.ts (sourceMap: true, reactDev: false, target: esnext)
    3.03x faster than swc
    26.98x faster than babel
  oxc - src/transform.bench.ts > renderer.ts (sourceMap: false, reactDev: false, target: esnext)
    3.21x faster than swc
    23.76x faster than babel
  oxc - src/transform.bench.ts > renderer.ts (sourceMap: false, reactDev: false, target: es2015)
    3.62x faster than swc
    22.93x faster than babel
  oxc - src/transform.bench.ts > renderer.ts (sourceMap: true, reactDev: false, target: esnext)
    3.11x faster than swc
    18.77x faster than babel
  oxc - src/transform.bench.ts > table.tsx (sourceMap: false, reactDev: false, target: esnext)
    3.74x faster than swc
    30.57x faster than babel
  oxc - src/transform.bench.ts > table.tsx (sourceMap: false, reactDev: false, target: es2015)
    4.32x faster than swc
    30.96x faster than babel
  oxc - src/transform.bench.ts > table.tsx (sourceMap: true, reactDev: false, target: esnext)
    3.59x faster than swc
    26.30x faster than babel
  oxc - src/transform.bench.ts > table.tsx (sourceMap: false, reactDev: true, target: esnext)
    4.71x faster than swc
    46.03x faster than babel
  oxc - src/transform.bench.ts > table.tsx (sourceMap: true, reactDev: true, target: esnext)
    4.45x faster than swc
    37.05x faster than babel
```

## Isolated Declarations DTS Emit

Oxc is 45x faster than `tsc` on ordinary files, and 20x faster on larger files.

### GitHub Actions `ubuntu-latest`

```
oxc - src/id.bench.ts > UserSettings.tsx
  44.45x faster than tsc

oxc - src/id.bench.ts > parser.ts
  21.16x faster than tsc

oxc - src/id.bench.ts > renderer.ts
  21.70x faster than tsc

oxc - src/id.bench.ts > table.tsx
  7.99x faster than tsc
```


### Memory Usage

On `parser.ts` by using `/usr/bin/time -alh node`:

|       | Max RSS |
| ---   | ------- |
| oxc   | 57 MB   |
| swc   | 74 MB   |
| babel | 180 MB  |

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
