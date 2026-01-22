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
                this.pu = this.pen_up;
                this.up = this.pen_up;
                this.pd = this.pen_down;
                this.down = this.pen_down;
                this.rt = this.right;
                this.lt = this.left;
                this.fd = this.forward;
                this.fw = this.forward;
                this.fwd = this.forward;
                this.bk = this.backward;
                this.back = this.backward;
                this.st = this.show;
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


        /** Hides the Turtle */
        hide() {
                this.push();
                stroke("#00000000") // fully transparent?
                this.pop();
        }

        /** Shows the Turtle */
        show() {
                this.push();
                stroke('pink');
                this.pen_down();
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
        pen_up() {
                this.penDown = false;
        }

        /** Put the pen down so it writes */
        pen_down() {
                this.penDown = true;
        }

        /** Rotate the turtle to its right by certain degrees
         * @param  {number} rot - angle to rotate in degrees
         */
        right(rot) {
                this.heading += radians(rot);
        }

        /** Rotate the turtle to its left by certain degrees
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
