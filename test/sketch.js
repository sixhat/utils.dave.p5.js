let p;
function setup(){
  createCanvas(400,300);
  background("lemonchiffon");
  p = new LSystem('A', 'F', {'F':'FF', 'A':'AF'});
  print(p);
  p.iterate(1);
  print (p);


  t = new Turtle();
  t.pos(width/2, height/2);
  t.drawLSystem(p);
}
