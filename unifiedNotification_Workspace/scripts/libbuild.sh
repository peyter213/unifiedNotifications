#!/bin/bash

echo "Building"

ng build pey-unified-notifications

echo "copying readme and license"

node scripts/copy-artifacts.js


cd projects/pey-unified-notifications

# tsc -p tsconfig.schematics.json

# echo "Copying collections to dist"

# cp collection.json ../../dist/spey-unified-notifications

# npm publish