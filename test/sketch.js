let p;
function setup(){
  createCanvas(800,800);
  background("skyblue");
  p = new LSystem('A', 'F', {'F':'A+F', 'A':'FAf-FA-'});

  p.iterate(7);


  t = new Turtle();
  t.pos(width/2, height/2);
  t.st(3);
  t.drawLSystem(p, 10, 90);
  text(p.endString,10,height-20);
}
