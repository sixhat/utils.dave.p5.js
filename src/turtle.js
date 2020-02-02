// The Turtle class implements the basic methods of Turtle graphics from the logo languages.
class Turtle {
  constructor(x, y, heading) {
    this.x = x | 0;
    this.y = y | 0;
    this.penDown = true;
    this.penColor = 0;
    this.penWeight = 1;
    this.heading = heading | -HALF_PI;
    this.stack = [];
    this.cl = this.color;
    this.pu = this.up;
    this.pd = this.down;
    this.rt = this.right;
    this.lt = this.left;
    this.fd = this.forward;
    this.fw = this.forward;
    this.bk = this.backward;
    this.back = this.backward;
    this.st = this.style;
  }
  // This function draws an L-System based on default values.
  // The turtle knows how to draw certain types of LSystems
  // F means forward with pen down
  // f means fordward with pen up
  // X or any other letter pass.
  // [ push
  // ] pop
  // + turn right
  // - turn left
  drawLSystem(ls, step, angle) {
    this.drawString(ls.endString, step, angle);
  }

  // Draw a string (used by drawLSystem, but can be generic)
  drawString(string, step, angle) {
    for (const letter of string) {
      switch (letter) {
        case "F":
          this.pd();
          this.fw(step);
          break;
        case "f":
          this.pu();
          this.fw(step);
          break;
        case "[":
          this.push();
          break;
        case "]":
          this.pop();
          break;
        case "+":
          this.rt(angle);
          break;
        case "-":
          this.lt(angle);
          break;
        default:
      }
    }
  }

  // Pushes the current state of turtle to stack.
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
  // Reverts to previous saved state of the turtle removing it from the stack.
  pop() {
    const el = this.stack.pop();
    this.x = el.x;
    this.y = el.y;
    this.penDown = el.penDown;
    this.penColor = el.penColor;
    this.penWeight = el.penWeight;
    this.heading = el.heading;
  }

  color(c) {
    this.penColor = c;
  }
  up() {
    this.penDown = false;
  }
  down() {
    this.penDown = true;
  }
  right(rot) {
    this.heading += radians(rot);
  }
  left(rot) {
    this.heading -= radians(rot);
  }
  // Set turtle position in coordinate system
  pos(x, y) {
    this.x = x;
    this.y = y;
  }
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
  // Moves the turtle backwards without painting.
  backward(steps) {
    const ps = this.penDown;
    this.penDown = false;
    this.forward(-steps);
    this.penDown = ps;
  }
  style(weight) {
    this.penWeight = weight;
  }
  // Set heading of turtle East=0, CW
  hd(h) {
    this.heading = radians(h);
  }
}
