let p;
let t;
function setup() {
  createCanvas(800, 800);
  background("skyblue");
  p = new LSystem("A", "F", { F: "A+F", A: "FA[f-F]A-FF" });

  p.iterate(7);

  t = new Turtle();
  t.pos(width / 2, height / 2);
  t.st(2);
  t.drawLSystem(p, 5, 20);
  text(p.endString, 10, height - 20);
  frameRate(3);
}

function draw() {
  background("skyblue");
  t.pos(width / 2, height / 2);
  t.drawLSystem(p, 10, frameCount);
}
