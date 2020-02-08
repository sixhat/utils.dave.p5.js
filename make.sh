#!/bin/sh

mkdir -p ./lib

out="./lib/utils.dave.p5.js"
version=`cat version.txt`

echo Making version $(($version + 1 ))
rm $out

echo CoffeeScript Conversion
coffee -cb src/*.coffee

echo // utils.dave.p5.js v.$(($version + 1 )) > $out
cat src/*.js >> $out
echo $(( $version + 1 )) > version.txt

git commit -a -m 'make $(( $version + 1 ))'
git tag -a v$(( $version + 1 )) -m '$(( $version + 1 ))'
git push
