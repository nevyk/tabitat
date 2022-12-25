#! /bin/bash

# change to root of project directory
SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
cd $SCRIPT_DIR/..

# get package version
VERSION=$(cat package.json | jq -r .version)

# zip dist
cd dist
zip tabitat_$VERSION.zip assets/* icons/* index.html manifest.json