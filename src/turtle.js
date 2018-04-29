// The Turtle class implements the basic methods of Turtle graphics from the logo languages.
class Turtle {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.penDown = false;
		this.penColor = 0;
		this.penWeight = 1;
		this.heading = -HALF_PI;
		this.stack = [];
	}

	// ToDo - This function will draw an L-System based on default values.
	drawLSystem(ls){
		
	}

	// Pushes the current state of turtle to stack.
	push() {
		this.stack.push({
			'x': this.x,
			'y': this.y,
			'penDown': this.penDown,
			'penColor': this.penColor,
			'penWeight': this.penWeight,
			'heading': this.heading
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

	// Alias to color
	cl(c) {
		this.color(c);
	}
	color(c) {
		this.penColor = c;
	}

	// Alias to up
	pu() {
		this.up();
	}
	up() {
		this.penDown = false;
	}

	// Alias to down
	pd() {
		this.down();
	}
	down() {
		this.penDown = true;
	}

	// Alias to right
	rt(r) {
		this.right(r);
	}
	right(rot) {
		this.heading += radians(rot);
	}

	// Alias to left
	lt(l) {
		this.left(l);
	}
	left(rot) {
		this.heading -= radians(rot);
	}

	// Set turtle position in coordinate system
	pos(x, y) {
		this.x = x;
		this.y = y;
	}
	// Alias to forward
	fw(s) {
		this.forward(s);
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
	// Alias to backward
	bk(s) {
		this.backward(s);
	}
	backward(steps) {
		const ps = this.penDown;
		this.penDown = false;
		this.forward(-steps);
		this.penDown = ps;
	}
	st(s) {
		this.style(s);
	} // Alias
	style(weight) {
		this.penWeight = weight;
	}
	// Set heading of turtle East=0, CW
	hd(h) {
		this.heading = radians(h)
	};
}
