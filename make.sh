#!/usr/bin/env bash

set -xe

mkdir -p ./lib

out="./lib/utils.dave.p5.js"
version=$(cat version.txt)
version=$((version + 1 ))

echo Making version "$version"
rm "$out"

echo
echo CoffeeScript Conversion
echo "> coffee --no-header -cb src/*.coffee"
coffee --no-header -cb src/*.coffee

echo
echo "Concatenating JS Files"
echo // utils.dave.p5.js v."$version" > "$out"
echo "> cat src/*.js >> $out"
cat src/*.js >> "$out"

echo
echo Minifying 
echo "> minify lib/utils.dave.p5.js > lib/utils.dave.p5.min.js"
minify lib/utils.dave.p5.js > lib/utils.dave.p5.min.js

echo
echo Generating documentation
echo "> jsdoc src/*.js -d ./doc/ -t ../minami/ -r Readme.md"
#jsdoc src/*.js -d ./doc/ -t ../minami/ -r Readme.md
jsdoc src/*.js -d ./doc/ -r Readme.md

echo "$version" > version.txt

echo 
echo "Committing to Github"
git commit -a -m "make version $version"
git tag -a v"$version" -m "Version $version"
#git push
echo 
echo Done.
