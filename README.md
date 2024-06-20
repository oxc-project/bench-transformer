# Bench Transformer

## Isolated Declarations

### MacBook Pro Apple M3 Max

Oxc is at least 20 times faster than tsc.

```
 ✓ src/isolatedDeclarations.bench.js (6) 3839ms
   ✓ simple.ts (2) 1225ms
     name                                    hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          24,306.32  0.0382  0.7928  0.0411  0.0425  0.0522  0.0548  0.0659  ±0.34%    12154   fastest
   · typescript.transpileDeclaration     303.03  1.9342  8.3384  3.3000  3.9623  8.1062  8.3384  8.3384  ±6.13%      152
   ✓ vue-large.ts (2) 1395ms
     name                                  hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration           671.69   1.4357   2.4655   1.4888   1.5007   1.6869   2.1395   2.4655  ±0.56%      336   fastest
   · typescript.transpileDeclaration  29.5000  32.3717  40.2400  33.8984  34.4519  40.2400  40.2400  40.2400  ±3.16%       15
   ✓ vue.ts (2) 1215ms
     name                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          9,166.97  0.1019  0.7393  0.1091  0.1114  0.1251  0.1285  0.1356  ±0.30%     4584   fastest
   · typescript.transpileDeclaration    302.93  2.5253  8.5047  3.3011  3.9761  7.3282  8.5047  8.5047  ±4.30%      152


 BENCH  Summary

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > simple.ts
    80.21x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue-large.ts
    22.77x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue.ts
    30.26x faster than typescript.transpileDeclaration
```

## Fixtures

* simple.ts (5kb, 156 loc) - copied from https://github.com/microsoft/TypeScript/blob/main/tests/cases/transpile
* vue.ts (31kb, 1185 loc) - some files combined from the vue repository
* vue-large.ts (320kb, 11702 loc) - all vue files combined
