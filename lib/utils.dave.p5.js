// utils.dave.p5.js v.134
class Dave {
  // Short version of functions bellow.
  constructor() {
    this.grid = new Guides();
    this.g = this.grid;
    this.f = this.fillHsluv;
    this.s = this.strokeHsluv;
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

// Simples construtor de paletas de cores.
const paleta = {
  cor: [],
  tom: function(n, sat = 100, luz = 100) {
    colorMode(HSB, 360, 100, 100, 100);
    const step = 360 / (n - 1);
    while (n-- > 0) {
      this.cor[this.cor.length] = color(360 - n * step, sat, luz);
    }
  },
  luz: function(n = 10, tom = random(360), sat = 100) {
    colorMode(HSB, 360, 100, 100, 100);
    const step = 100 / (n - 1);
    while (n-- > 0) {
      this.cor[this.cor.length] = color(tom, sat, 100 - n * step);
    }
  },
  sat: function(n = 10, tom = random(360), luz = 100) {
    colorMode(HSB, 360, 100, 100, 100);
    const step = 100 / (n - 1);
    while (n-- > 0) {
      this.cor[this.cor.length] = color(tom, 100 - n * step, luz);
    }
  }
}
class Grid {
  constructor(linhas = 1, colunas = 1, margem = 0, gutter = 0, largura = width, altura = height) {
    this.linhas = linhas;
    this.colunas = colunas;
    this.margem = margem;
    this.gutter = gutter;
    this.largura = largura;
    this.altura = altura;
}
  compute() {
    this.areaw = (this.largura - 2 * this.margem - (this.colunas - 1) * this.gutter) / this.colunas;
    this.areah = (this.altura - 2 * this.margem - (this.linhas - 1) * this.gutter) / this.linhas;
    this.areas = [];
    this.areas.length = this.linhas;
    for (let linha = 0; linha < this.linhas; linha++) {
      this.areas[linha] = [];
      for (let coluna = 0; coluna < this.colunas; coluna++) {
        const box = {
          x: this.margem + (this.areaw + this.gutter) * coluna,
          y: this.margem + (this.areah + this.gutter) * linha,
          w: this.areaw,
          h: this.areah
        }
        this.areas[linha][coluna] = box;
      }
    }
  }
  render(encher = false) {
    push();
    resetMatrix();
    stroke('pink');
    if (encher) {
      fill(encher);
    } else {
      noFill();
    }
    textSize(10);
    for (let linha = 0; linha < this.linhas; linha++) {
      for (let coluna = 0; coluna < this.colunas; coluna++) {
        const box = this.areas[linha][coluna];
        rect(box.x, box.y, box.w, box.h);
        text(linha * this.colunas + coluna, box.x + 2, box.y + 10);
      }
    }
    pop();
  }
  area(inicio = 0, fim = 0) {
    if (fim < inicio) {
      const aux = fim;
      fim = inicio;
      inicio = aux;
    }
    if (fim >= this.linhas * this.colunas) {
      console.log('ERRO: área FIM fora da grelha');
      return;
    }

    const ilin = Math.floor(inicio / this.colunas);
    const icol = inicio % this.colunas;
    const flin = Math.floor(fim / this.colunas);
    const fcol = fim % this.colunas;

    return {
      x: this.areas[ilin][icol].x,
      y: this.areas[ilin][icol].y,
      w: this.areas[flin][fcol].x + this.areas[flin][fcol].w - this.areas[ilin][icol].x,
      h: this.areas[flin][fcol].y + this.areas[flin][fcol].h - this.areas[ilin][icol].y
    };
  }
}

//  Simple Manual Guides to place over drawings
class Guides {
  constructor() {
    this.horizontal = [];
    this.vertical = [];
    this.rectangles = [];
    this.color = color("#FF00FFAA");
  }
  show() {
    push();
    stroke(this.color);
    noFill();
    rectMode(CORNERS);

    this.horizontal.forEach(y => line(0, y, width, y));
    this.vertical.forEach(x => line(x, 0, x, height));
    this.rectangles.forEach(r => rect(r[0], r[1], r[2], r[3]));
    pop();
  }
  clear() {
    this.clearHorizontal();
    this.clearVertical();
    this.clearRectangles();
    this.color = color("#FF00FFAA");
  }
  clearHorizontal() {
    this.horizontal = [];
  }
  clearVertical() {
    this.vertical = [];
  }
  clearRectangles() {
    this.rectangles = [];
  }
}
var LSystem;

LSystem = class LSystem {
  /**
  * LSystem Generator
  * @param  {string} alphabet - the characters recognized by the LSystem
  * @param  {string} axiom - The starting axiom of The LSystem generator
  * @param  {object} rules - a dictionary mapping letters to rules of LSystems
   */
  constructor(alphabet, axiom, rules) {
    this.alphabet = alphabet;
    this.axiom = axiom;
    this.rules = rules;
    this.startString = this.axiom;
    this.endString = '';
    this.nIters = 0;
  }

  /** Processes the Current String according to the rules in the LSystem
   * @param {string} oldStr the string to be processed
   * @return {string} the processede string
   */
  processString(oldStr) {
    var c, i, len, newStr;
    newStr = '';
    for (i = 0, len = oldStr.length; i < len; i++) {
      c = oldStr[i];
      newStr += (this.rules[c] ? this.rules[c] : c);
    }
    return newStr;
  }

  /**
  * Iterates the LSystems 
  * @param {number} nIters - Number of interations to compute
   */
  iterate(nIters) {
    var i, n, ref;
    if (nIters < 1) {
      return this.endStrig;
    }
    for (n = i = 1, ref = nIters; (1 <= ref ? i <= ref : i >= ref); n = 1 <= ref ? ++i : --i) {
      this.endString = this.processString(this.startString);
      this.startString = this.endString;
    }
    this.nIters += nIters;
    return this.endString;
  }

  /** Add an extra Rule to the LSystem
   * @param {string} key - the rule to add
   * @param {string} action - the action to perform with this rule
   */
  addRule(key, action) {
    return this.rules[key] = action;
  }

  /** Removes a rule from the LSystem
   * @param {string} key - the rule to remove
   */
  removeRule(key) {
    return delete this.rules[key];
  }

};
/** Sine Wave Oscillator
 * @param  {number} p=1s - Period of the Oscillator
 * @param  {number} a=1 - Lower value of the oscillator
 * @param  {number} b=2 - Higher value of the oscillator
 * @param  {number} phase=0 - Initial oscillator angle
 */
class Oscillator {
  constructor(p = 1, a = 1, b = 2, phase = 0) {
    this.period = p;
    this.amplitude = Math.abs(b - a) / 2;
    this.frequency = 1 / this.period;
    this.center = (a + b) / 2;
    this.phase = phase;
    this.activate();
  }

  /**
   * Activates the Oscillator(Resets Time to zero)
   */
  activate() {
    this.active = true;
    this.start_time = Date.now() / 1000;
    this.t = Date.now() - this.start_time;
    this.y = this.center + this.amplitude * Math.sin(2 * Math.PI * this.t * this.frequency + this.phase);
    this.x = this.t;
    this.px = this.x;
    this.pt = this.x;
    this.py = this.y;
  }

  /** Pauses the Oscillator
   */
  pause() {
    this.active = false;
  }

  /** unPauses the oscillator
   */
  unPause() {
    this.active = true;
  }

  /** Computes the value of the oscillator
   * @returns {number} The value of the oscillator at current time.
   */
  go() {
    if (this.active) {
      this.pt = this.t;
      this.px = this.pt;
      this.py = this.y;
      this.t = Date.now() / 1000 - this.start_time;
      this.y = this.center + this.amplitude * Math.sin(2 * Math.PI * this.t * this.frequency + this.phase);
      this.x = this.t;
    }
    return this.y;
  }
}
const range=n=>[...Array(n).keys()]
class Turtle {
  /** 
   * A Turtle that can be controlled in the style of the LOGO Language
   * @param  {number} x - Initial X Position of Turtle
   * @param  {number} y - Initial Y Position of Turtle 
   * @param  {number} heading - Initial Heading of Turtle
   */
  constructor(x = 0, y = 0, heading = -HALF_PI) {
    this.x = x ;
    this.y = y ;
    this.penDown = true;
    this.penColor = 0;
    this.penWeight = 1;
    this.heading = heading;
    this.stack = [];
    this.cl = this.color;
    this.pu = this.up;
    this.pd = this.down;
    this.rt = this.right;
    this.lt = this.left;
    this.fd = this.forward;
    this.fw = this.forward;
    this.fwd = this.forward;
    this.bk = this.backward;
    this.back = this.backward;
    this.st = this.style;
  }

  /**
  * Draws an L-System based on default values.
  * The turtle knows how to draw certain types of LSystems
  * 
  * <br>F means forward with pen down
  * <br>f means fordward with pen up
  * <br>X or any other letter pass.
  * <br>[ push
  * <br>] pop
  * <br>+ turn right
  * <br>- turn left
  * 
  * @param {LSystem} ls - the LSystem to draw
  * @param {number} step - the size of the step
  * @param {number} angle - the angle of turns 
   */
  drawLSystem(ls, step, angle) {
    this.drawString(ls.endString, step, angle);
  }

  /** Draw a string (used by drawLSystem)
   * @param  {string} string
   * @param  {number} step
   * @param  {number} angle
   */
  drawString(string, step, angle) {
    const draw = {
      "f": e => { e.pu; e.forward(step) },
      "F": e => { e.pd; e.forward(step) },
      "[": e => e.push(),
      "]": e => e.pop(),
      "+": e => e.right(angle),
      "-": e => e.left(angle)
    };
    const commands = Object.keys(draw);
    [...string].forEach(letter => {
      if (commands.includes(letter)) draw[letter](this);
    });
  }

  /** Pushes the current state of turtle to stack. */
  push() {
    this.stack.push({
      x: this.x,
      y: this.y,
      penDown: this.penDown,
      penColor: this.penColor,
      penWeight: this.penWeight,
      heading: this.heading
    });
  }

  /** Reverts to previous saved state of the turtle removing it from the stack */
  pop() {
    const el = this.stack.pop();
    this.x = el.x;
    this.y = el.y;
    this.penDown = el.penDown;
    this.penColor = el.penColor;
    this.penWeight = el.penWeight;
    this.heading = el.heading;
  }

  /** Shows the Turtle */
  show() {
    this.push();
    stroke('pink');
    this.down();
    this.rt(10);
    this.fd(-10);
    this.fd(10);
    this.lt(20);
    this.fd(-10);
    this.pop();
  }
  
  /** Sets the color of the pen 
   * @param  {Color} c - a P5js valid color
   */
  color(c) {
    this.penColor = c;
  }

  /** Put the pen up so it doesn't write */
  up() {
    this.penDown = false;
  }

  /** Put the pen down so it writes */
  down() {
    this.penDown = true;
  }
  
  /** Rotate the turtle to its right by certain degrees
   * @param  {number} rot - angle to rotate in degrees
   */
  right(rot) {
    this.heading += radians(rot);
  }

  /** Rotate the turtlo to its left by certain degrees
   * @param  {number} rot - angle to rotate in degrees
   */
  left(rot) {
    this.heading -= radians(rot);
  }
  
  /** Set turtle position in coordinate system
   * @param  {number} x - the X position
   * @param  {number} y - the Y position
   */
  pos(x, y) {
    this.x = x;
    this.y = y;
  }

  /** Move the turtle forward 
   * @param  {number} steps - the number of steps to move forward
   */
  forward(steps) {
    const tx = this.x + steps * cos(this.heading);
    const ty = this.y + steps * sin(this.heading);
    if (this.penDown) {
      push();
      stroke(this.penColor);
      strokeWeight(this.penWeight);
      line(this.x, this.y, tx, ty);
      pop();
    }
    this.x = tx;
    this.y = ty;
  }

  /** Move the turtle backwards without painting
   * @param  {number} steps - the number of steps to move
   */
  backward(steps) {
    const ps = this.penDown;
    this.penDown = false;
    this.forward(-steps);
    this.penDown = ps;
  }

  
  /** Set the weight of the pen 
   * @param  {number} weight - the weight of the pen
   */
  style(weight) {
    this.penWeight = weight;
  }

  /** Set heading of turtle East=0, CW
   * @param {number} heading - the heading of the turtle
    */
  hd(heading) {
    this.heading = radians(heading);
  }
}
  class Menu {
    /** Menu
     * @param  {number} x - the topleft-x coordinate of the Menu
     * @param  {number} y - the topleft-y coordinate of the Menu
   * @param  {number} dir=0 - The direction of the menu (0: vertical, 1: horizontal)
   */
  constructor(x, y, dir = 0) {
    this.p = createVector(x, y);
    this.btns = [];
    this.dir = dir;
  }
  
  /** Add a Button to the menu
   * @param  {Button} btn - the button to add to the menu
   */
  add(btn) {
    this.btns.push(btn);
    for (let i = 0; i < this.btns.length; i++) {
      let b = this.btns[i];
      if (this.dir) {
        b.p = createVector(this.p.x, this.p.y + 22 * i);
      } else {
        b.p = createVector(this.p.x + i * (b.tw + 20), this.p.y);
      }
    }
  }
  
  /** Passes the click event to all buttons for processing */
  click() {
    for (let b of this.btns) {
      b.click();
    }
  }
  /** Draw the menu by calling render on all buttons */
  render() {
    for (let b of this.btns) {
      b.render();
    }
  }

}

class Button {
  /** A Button
   * @param  {number} x=0 - The X coordinate of the button
   * @param  {number} y=0 - The Y Coordinate of the button
   * @param  {function} action - the action to perform
   * @param  {stringk} texto - Text to display
   */
  constructor(x = 0, y = 0, action, texto) {
    this.p = createVector(x, y);
    this.a = action;
    this.texto = texto;
    textSize(10);
    this.tw = textWidth(this.texto);
  }
  /** Checks if mouse is inside the button */
  mouseIn() {
    return (mouseX > this.p.x &&
      mouseX < this.p.x + this.tw + 20 &&
      mouseY > this.p.y &&
      mouseY < this.p.y + 20);
  }
  /** On Click executes the function */
  click() {
    if (this.mouseIn()) {
      this.a(mouseX);
    }
  }
  /** draws the Button */
  render() {
    push();
    resetMatrix();
    textSize(10);
    if (this.mouseIn()) {
      fill('#FFF');
      if (mouseIsPressed) {
        fill('#AAA');
      }
    } else {
      fill('#AAA3');
    }
    rect(this.p.x, this.p.y, this.tw + 20, 20);
    fill(0);
    text(this.texto, this.p.x + 10, this.p.y + 14);
    pop();
  }
}
