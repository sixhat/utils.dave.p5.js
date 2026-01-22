  class Menu {
      /** Menu
       * @param  {number} x - the topleft-x coordinate of the Menu
       * @param  {number} y - the topleft-y coordinate of the Menu
       * @param  {number} dir=0 - The direction of the menu (0: vertical, 1: horizontal)
       */
      constructor(x, y, dir = 0) {
          this.p = createVector(x, y);
          this.btns = [];
          this.dir = dir;
      }

      /** Add a Button to the menu
       * @param  {Button} btn - the button to add to the menu
       */
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

      /** Passes the click event to all buttons for processing */
      click() {
          for (let b of this.btns) {
              b.click();
          }
      }
      /** Draw the menu by calling render on all buttons */
      render() {
          for (let b of this.btns) {
              b.render();
          }
      }

  }

  class Button {
      /** A Button
       * @param  {number} x=0 - The X coordinate of the button
       * @param  {number} y=0 - The Y Coordinate of the button
       * @param  {function} action - the action to perform
       * @param  {stringk} texto - Text to display
       */
      constructor(x = 0, y = 0, action, texto) {
          this.p = createVector(x, y);
          this.a = action;
          this.texto = texto;
          textSize(10);
          this.tw = textWidth(this.texto);
      }
      /** Checks if mouse is inside the button */
      mouseIn() {
          return (mouseX > this.p.x &&
              mouseX < this.p.x + this.tw + 20 &&
              mouseY > this.p.y &&
              mouseY < this.p.y + 20);
      }
      /** On Click executes the function */
      click() {
          if (this.mouseIn()) {
              this.a(mouseX);
          }
      }
      /** draws the Button */
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