#!/usr/bin/env bash

yell() { echo "$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "cannot $*"; }

do_dirs(){
    echo "Creating directories lib and build"
    mkdir -p ./lib
    mkdir -p ./build
    mkdir -p ./doc
}

do_format_code(){
    echo "Formating code"
    npx prettier ./src/ --write
    npx prettier ./examples/ -write
}


do_clean(){
    echo "Remove build and lib" 
    rm -rf ./build
    rm -rf ./lib
    rm -rf ./doc
}

do_lib(){
    echo Build Lib
    try do_dirs
    cat src/*.js >> ./build/utils.dav.p5.js
    minify ./build/utils.dav.p5.js > ./lib/utils.dave.p5.min.js
}

do_docs(){
    echo Generating documentation
    jsdoc src/*.js -d ./doc/ -r Readme.md
}

try do_clean
try do_format_code
try do_lib
try do_docs

version=$(cat version.txt)
version=$((version + 1 ))
echo "$version" > version.txt
echo Done version "$version".
