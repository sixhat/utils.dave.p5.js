# Dave Utils for working with P5.js

This is a collection of utils I use with P5.js to make some of my sketches easier to work with.

It includes tools to work with:

- Grids
- Perceptually uniform colors
- [LSystems](https://sixhat.github.io/utils.dave.p5.js/doc/LSystem.html)
- [Turtle Graphics](https://sixhat.github.io/utils.dave.p5.js/doc/Turtle.html)
- [Ui Menus](https://sixhat.github.io/utils.dave.p5.js/)
- [Oscillators](https://sixhat.github.io/utils.dave.p5.js/doc/Oscillator.html)

## How to use

Download the latest file `utils.dave.p5.js` or `utils.dave.p5.min.js` from [the repository](https://github.com/sixhat/utils.dave.p5.js/tree/master/lib)

In your index.html add library JS to your header, AFTER the p5.js library

```html
<script src="p5.min.js"></script>
<script src="utils.dave.p5.min.js"></script>
```

This makes the classes in utils available to use in your sketch.js

### Using a CDN:

if you prefer you can pull the library from a CDN with

```html
<script src="https://cdn.jsdelivr.net/gh/sixhat/utils.dave.p5.js@master/lib/utils.dave.p5.min.js"></script>
```

## Examples

- [Hilbert](./examples/hilbert/index.html) illustrates LSystems and Turtle
  graphics
- [Trails](./examples/particles-trails/) illustrates using a Menu and a Button

## Documentation

The code has inline code, but you can also check the [documentation online](https://sixhat.github.io/utils.dave.p5.js/doc/).

### Note

This is a work in progress and still far from concluded (or fully documented).

In any case if you find it useful and want to contribute please create a pull-request and I'll gladly add new features/corrections to it.

## Requirements

### CoffeeScript

Some of the src files have been written in coffeescript, therefore you'll need
to install [CoffeeScript](https://coffeescript.org/#introduction) as a
requirement.

### JSDoc

[JSDoc](https://jsdoc.app/) should be installed in your system. Something like

```sh
npm install -g jsdoc

or

brew install jsdoc3
```

should do the trick

### Minify

[Minify](https://github.com/tdewolff/minify/tree/master/cmd/minify) is needed to make the JS lib small(ish).

```sh
brew install tdewolff/tap/minify
```

### Js-beautify

[JS-beautify](https://www.npmjs.com/package/js-beautify) is needed, well to
make code beautiful.

install usually goes like this:

```sh
npm install -g js-beautify
```
