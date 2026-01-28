let l_system;
let turtle;

function setup() {
  createCanvas(innerWidth, innerHeight);
  const min_size = min(innerWidth, innerHeight);
  const num_iter = 8;
  const fsize = (min_size - 20) / (2 ** num_iter - 1);
  background(255);
  l_system = new LSystem("AB", "A", {
    A: "-BF+AFAFA+FAB-",
    B: "+AF-ABFB-FA+",
  });
  l_system.iterate(num_iter);
  turtle = new Turtle(min_size - 10, min_size - 10);
  turtle.drawLSystem(l_system, fsize, 93);
}
