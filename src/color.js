class Dave {
  // Short version of functions bellow.
  constructor(){
    this.grid=new Grid();
    this.g = this.grid;
  }
  // alias for fillHsluv
  f(h, s, l) {
    this.fillHsluv(h,s,l);
  }
  // alias for strokeHsluv
  s(h, s, l) {
    this.strokeHsluv(h,s,l);
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
}
