let ls;
let t;
function setup() {
  createCanvas(innerWidth, innerHeight);
  const minS = min(innerWidth, innerHeight);
  const niter = 7;
  const fsize = (minS-20)/ (2**niter-1);
  background(255);
  ls = new LSystem(
    "AB",
    "A",
    {
      'A':'-BF+AFA+FB-',
      'B':'+AF-BFB-FA+'
    });
    ls.iterate(niter);
    t = new Turtle(minS-10, minS-10);
    t.drawLSystem(ls, fsize, 90);
}
