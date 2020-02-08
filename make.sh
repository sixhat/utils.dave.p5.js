#!/bin/sh

mkdir -p ./lib

out="./lib/utils.dave.p5.js"
version=`cat version.txt`
version=$(($version + 1 ))

echo Making version $version
rm $out

echo CoffeeScript Conversion
coffee -cb src/*.coffee

echo // utils.dave.p5.js v.$(($version + 1 )) > $out
cat src/*.js >> $out
echo $(( $version + 1 )) > version.txt

git commit -a -m "'make version $version'"
git tag -a v$version -m "'Version $version'"
git push
