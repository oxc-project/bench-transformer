# Bench Transformer

## Transformer

### MacBook Pro M3 Max

Oxc is at least 3 times faster than swc.

```
 ✓ src/transformer.bench.js (2) 1280ms
   ✓ typescript.ts (2) 1278ms
     name                hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · oxc.transform   206.73   4.6710   5.3937   4.8372   4.8827   5.2200   5.3937   5.3937  ±0.48%      104   fastest
   · swc.transform  54.7220  17.5129  19.4141  18.2742  18.8245  19.4141  19.4141  19.4141  ±1.22%       28

BENCH  Summary

oxc.transform - src/transformer.bench.js > typescript.ts
   3.78x faster than swc.transform
```

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

### MacBook Pro M3 Max

Oxc is at least 20 times faster than tsc.

```
 ✓ src/isolatedDeclarations.bench.js (8) 5264ms
   ✓ simple.ts (2) 1230ms
     name                                    hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          29,640.31  0.0305  0.4573  0.0337  0.0340  0.0439  0.0454  0.0551  ±0.25%    14821   fastest
   · typescript.transpileDeclaration     363.42  1.5387  8.6191  2.7516  2.9990  6.8490  8.6191  8.6191  ±6.06%      182
   ✓ typescript.ts (2) 1436ms
     name                                  hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration           558.71   1.5491   3.1518   1.7898   1.8538   2.6166   3.0556   3.1518  ±1.42%      280   fastest
   · typescript.transpileDeclaration  27.0902  33.1530  49.9506  36.9137  38.1961  49.9506  49.9506  49.9506  ±7.06%       14
   ✓ vue-large.ts (2) 1378ms
     name                                  hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · oxc.isolatedDeclaration           693.69   1.2699   2.7921   1.4416   1.4516   2.1403   2.1675   2.7921  ±1.09%      347   fastest
   · typescript.transpileDeclaration  30.3635  28.5511  38.6734  32.9343  34.6183  38.6734  38.6734  38.6734  ±5.72%       16
   ✓ vue.ts (2) 1217ms
     name                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · oxc.isolatedDeclaration          8,093.61  0.1060  0.9229  0.1236  0.1274  0.1508  0.1713  0.2752  ±0.44%     4047   fastest
   · typescript.transpileDeclaration    284.95  2.5625  8.3006  3.5094  4.0177  8.0189  8.3006  8.3006  ±4.58%      143


 BENCH  Summary

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > simple.ts
    81.56x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > typescript.ts
    20.62x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue-large.ts
    22.85x faster than typescript.transpileDeclaration

  oxc.isolatedDeclaration - src/isolatedDeclarations.bench.js > vue.ts
    28.40x faster than typescript.transpileDeclaration
```

## Fixtures

* simple.ts (5kb, 156 loc) - copied from https://github.com/microsoft/TypeScript/blob/main/tests/cases/transpile
* vue.ts (31kb, 1185 loc) - some files combined from the vue repository
* vue-large.ts (320kb, 11702 loc) - all vue files combined
* typescript.ts (462, 11719 lines) - copied from https://github.com/microsoft/TypeScript/blob/main/src/compiler/utilities.ts
