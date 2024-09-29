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
oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: false, reactDev: false)
5.38x faster than swc
57.51x faster than babel

oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: true, reactDev: false)
5.15x faster than swc
47.33x faster than babel

oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: false, reactDev: true)
5.08x faster than swc
54.38x faster than babel

oxc - src/transform.bench.ts > UserSettings.tsx (sourceMap: true, reactDev: true)
4.99x faster than swc
48.33x faster than babel

oxc - src/transform.bench.ts > parser.ts (sourceMap: false, reactDev: false)
3.57x faster than swc
39.97x faster than babel

oxc - src/transform.bench.ts > parser.ts (sourceMap: true, reactDev: false)
3.45x faster than swc
31.61x faster than babel

oxc - src/transform.bench.ts > renderer.ts (sourceMap: false, reactDev: false)
3.64x faster than swc
27.85x faster than babel

oxc - src/transform.bench.ts > renderer.ts (sourceMap: true, reactDev: false)
3.56x faster than swc
19.13x faster than babel

oxc - src/transform.bench.ts > table.tsx (sourceMap: false, reactDev: false)
4.13x faster than swc
34.22x faster than babel

oxc - src/transform.bench.ts > table.tsx (sourceMap: true, reactDev: false)
3.90x faster than swc
26.15x faster than babel

oxc - src/transform.bench.ts > table.tsx (sourceMap: false, reactDev: true)
4.30x faster than swc
44.17x faster than babel

oxc - src/transform.bench.ts > table.tsx (sourceMap: true, reactDev: true)
3.93x faster than swc
32.84x faster than babel
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
