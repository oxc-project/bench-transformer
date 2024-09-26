#!/usr/bin/env bash

echo 'oxc'
/usr/bin/time -alh node ./src/memory/oxc.js

echo 'swc'
/usr/bin/time -alh node ./src/memory/swc.js

echo 'babel'
/usr/bin/time -alh node ./src/memory/babel.js
