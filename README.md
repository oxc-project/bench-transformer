# Bench Transformer

## Isolated Declarations

### Mac mini M2

```
 ✓ src/isolatedDeclarations.bench.js (6) 3858ms
   ✓ simple.ts (2) 1224ms
     name                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          3,638.64  0.2697  1.1273  0.2748  0.2767  0.3077  0.3157  0.3475  ±0.35%     1820   fastest
   · typescript.transpileDeclaration    300.61  2.3100  7.9422  3.3265  3.4880  7.5327  7.9422  7.9422  ±5.20%      151
   ✓ vue-large.ts (2) 1413ms
     name                                  hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration          99.2004   9.9803  10.3907  10.0806  10.1045  10.3907  10.3907  10.3907  ±0.31%       50   fastest
   · typescript.transpileDeclaration  28.7264  32.7956  42.2205  34.8112  35.0387  42.2205  42.2205  42.2205  ±3.90%       15
   ✓ vue.ts (2) 1219ms
     name                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          8,212.06  0.1179  1.1241  0.1218  0.1212  0.1433  0.1465  0.1630  ±0.45%     4107   fastest
   · typescript.transpileDeclaration    281.80  2.8115  7.1883  3.5487  4.4342  5.4738  7.1883  7.1883  ±3.87%      142


 BENCH  Summary

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > simple.ts
    12.10x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue-large.ts
    3.45x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue.ts
    29.14x faster than typescript.transpileDeclaration
```

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
