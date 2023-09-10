#!/usr/bin/env bash

# change to root of project directory
SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
cd $SCRIPT_DIR/..

# get package version
VERSION=$(cat package.json | jq -r .version)

# zip 
cd dist
zip -r tabitat_$VERSION.zip .
