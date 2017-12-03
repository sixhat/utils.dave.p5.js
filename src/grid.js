//  A simple Grid System to place over drawings
class Grid {
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

		for (let y of this.horizontal) {
			line(0, y, width, y);
		}
		for (let x of this.vertical) {
			line(x, 0, x, height);
		}

		rectMode(CORNERS);
		for (let r of this.rectangles) {
			rect(r[0], r[1], r[2], r[3]);
		}
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
