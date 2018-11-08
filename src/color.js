class Dave {
  // Short version of functions bellow.
  constructor() {
    this.grid = new Grid();
    this.g = this.grid;
  }
  // alias for fillHsluv
  f(h, s, l) {
    this.fillHsluv(h, s, l);
  }
  // alias for strokeHsluv
  s(h, s, l) {
    this.strokeHsluv(h, s, l);
  }
  // sets fill according to hsluv parameters
  fillHsluv(h, s, l) {
    let rgb = hsluv.hsluvToRgb([h, s, l]);
    fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
  }
  // sets stroke according to hsluv parameters
  strokeHsluv(h, s, l) {
    let rgb = hsluv.hsluvToRgb([h, s, l]);
    stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
  }
  // Create a fast get function to use instead of in P5.
  pget(x, y, img) {
    img.loadPixels();
    let d = pixelDensity();

    for (var i = 0; i < d; i++) {
      for (var j = 0; j < d; j++) {
        // loop over
        let idx = 4 * ((y * d + j) * img.width * d + (x * d + i));
        pixels[idx] = r;
        pixels[idx + 1] = g;
        pixels[idx + 2] = b;
        pixels[idx + 3] = a;
      }
    }
    // Things to take into consideration: x,y must be in image.
    // pixelDensity has to be taken into consideration.
    // loadPixels should be called only during the first time for this particular image.
  }
}
