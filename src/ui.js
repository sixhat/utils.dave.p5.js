class Menu {
  constructor(x, y, dir = 0) {
    this.p = createVector(x, y);
    this.btns = [];
    this.dir = dir;
  }
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

  click() {
    for (let b of this.btns) {
      b.click();
    }
  }
  render() {
    for (let b of this.btns) {
      b.render();
    }
  }

}

class Button {
  constructor(x = 0, y = 0, action, texto) {
    this.p = createVector(x, y);
    this.a = action;
    this.texto = texto;
    textSize(10);
    this.tw = textWidth(this.texto);
  }
  mouseIn() {
    return (mouseX > this.p.x &&
      mouseX < this.p.x + this.tw + 20 &&
      mouseY > this.p.y &&
      mouseY < this.p.y + 20);
  }

  click() {
    if (this.mouseIn()) {
      this.a(mouseX);
    }
  }
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
