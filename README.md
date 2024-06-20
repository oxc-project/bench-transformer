# Bench Transformer

## Isolated Declarations

### MacBook Pro Apple M3 Max

Oxc is faster than tsc

* 21x on small files
* 95x on large files

```
 ✓ src/isolatedDeclarations.bench.js (4) 2488ms
   ✓ simple.ts (2) 1233ms
     name                                   hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration          4,017.87  0.2441   1.0912  0.2489  0.2485   0.2801   0.2888   0.3000  ±0.35%     2009   fastest
   · typescript.transpileDeclaration    189.16  3.7418  10.2228  5.2864  5.9520  10.2228  10.2228  10.2228  ±4.91%       95
   ✓ vue.ts (2) 1254ms
     name                                   hz     min      max     mean      p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration          9,046.52  0.1025   0.7550   0.1105   0.1121   0.1285   0.1322   0.1420  ±0.29%     4524   fastest
   · typescript.transpileDeclaration   94.6748  8.5387  15.6287  10.5625  11.1114  15.6287  15.6287  15.6287  ±4.43%       48


 BENCH  Summary

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > simple.ts
    21.24x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue.ts
    95.55x faster than typescript.transpileDeclaration
```

## Fixtures

* simple.ts (5kb, 156 loc) - copied from https://github.com/microsoft/TypeScript/blob/main/tests/cases/transpile
* vue.ts (31kb, 1185 loc) - some files combined from the vue repository
