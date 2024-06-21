# Bench Transformer

## Isolated Declarations

### MacBook Pro Apple M3 Max

Oxc is at least 20 times faster than tsc.

```
 ✓ src/isolatedDeclarations.bench.js (6) 3830ms
   ✓ simple.ts (2) 1232ms
     name                                    hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          24,225.18  0.0384  0.5413  0.0413  0.0423  0.0528  0.0545  0.0626  ±0.27%    12113   fastest
   · typescript.transpileDeclaration     255.85  2.2887  8.9143  3.9086  4.3371  8.2512  8.9143  8.9143  ±5.79%      129
   ✓ vue-large.ts (2) 1382ms
     name                                  hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration           672.38   1.4229   2.8927   1.4873   1.5056   1.6957   2.1087   2.8927  ±0.71%      337   fastest
   · typescript.transpileDeclaration  32.5920  28.2735  38.3350  30.6824  31.2297  38.3350  38.3350  38.3350  ±3.99%       17
   ✓ vue.ts (2) 1214ms
     name                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          9,363.41  0.1025  1.3848  0.1068  0.1070  0.1292  0.1355  0.1447  ±0.55%     4682   fastest
   · typescript.transpileDeclaration    323.22  2.4291  6.6380  3.0939  3.6928  6.0445  6.6380  6.6380  ±3.72%      162


 BENCH  Summary

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > simple.ts
    94.69x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue-large.ts
    20.63x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue.ts
    28.97x faster than typescript.transpileDeclaration
```

## Fixtures

* simple.ts (5kb, 156 loc) - copied from https://github.com/microsoft/TypeScript/blob/main/tests/cases/transpile
* vue.ts (31kb, 1185 loc) - some files combined from the vue repository
* vue-large.ts (320kb, 11702 loc) - all vue files combined
