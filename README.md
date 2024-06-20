# Bench Transformer

## Isolated Declarations

### MacBook Pro Apple M3 Max

Oxc is 18 - 83 times faster than tsc

```
 ✓ src/isolatedDeclarations.bench.js (6) 5017ms
   ✓ simple.ts (2) 1226ms
     name                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          3,979.34  0.2450  1.2759  0.2513  0.2493  0.2990  0.3447  1.1749  ±0.59%     1990   fastest
   · typescript.transpileDeclaration    209.78  3.2251  8.7748  4.7670  5.2434  8.7264  8.7748  8.7748  ±5.14%      105
   ✓ vue-large.ts (2) 2554ms
     name                                 hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          217.19  4.5300  5.9759  4.6042  4.6027  5.0112  5.9759  5.9759  ±0.62%      109   fastest
   · typescript.transpileDeclaration  9.3542  100.72  123.49  106.90  107.58  123.49  123.49  123.49  ±4.18%       10
   ✓ vue.ts (2) 1236ms
     name                                   hz     min      max    mean     p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration          9,067.53  0.1029   1.0215  0.1103  0.1112   0.1312   0.1365   0.1460  ±0.52%     4534   fastest
   · typescript.transpileDeclaration    108.79  7.8236  15.8950  9.1922  9.7885  15.8950  15.8950  15.8950  ±3.66%       55

 BENCH  Summary

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > simple.ts
    18.97x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue-large.ts
    23.22x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue.ts
    83.35x faster than typescript.transpileDeclaration
```

## Fixtures

* simple.ts (5kb, 156 loc) - copied from https://github.com/microsoft/TypeScript/blob/main/tests/cases/transpile
* vue.ts (31kb, 1185 loc) - some files combined from the vue repository
* vue-large.ts (320kb, 11702 loc) - all vue files combined
