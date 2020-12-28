/** Sine Wave Oscillator
 * @param  {number} p=1s - Period of the Oscillator
 * @param  {number} a=1 - Lower value of the oscillator
 * @param  {number} b=2 - Higher value of the oscillator
 * @param  {number} phase=0 - Initial oscillator angle
 */
class Oscillator {
  constructor(p = 1, a = 1, b = 2, phase = 0) {
    this.period = p;
    this.amplitude = Math.abs(b - a) / 2;
    this.frequency = 1 / this.period;
    this.center = (a + b) / 2;
    this.phase = phase;
    this.activate();
  }

  /**
   * Activates the Oscillator(Resets Time to zero)
   */
  activate() {
    this.active = true;
    this.start_time = Date.now() / 1000;
    this.t = Date.now() - this.start_time;
    this.y = this.center + this.amplitude * Math.sin(2 * Math.PI * this.t * this.frequency + this.phase);
    this.x = this.t;
    this.px = this.x;
    this.pt = this.x;
    this.py = this.y;
  }

  /** Pauses the Oscillator
   */
  pause() {
    this.active = false;
  }

  /** unPauses the oscillator
   */
  unPause() {
    this.active = true;
  }

  /** Computes the value of the oscillator
   * @returns {number} The value of the oscillator at current time.
   */
  go() {
    if (this.active) {
      this.pt = this.t;
      this.px = this.pt;
      this.py = this.y;
      this.t = Date.now() / 1000 - this.start_time;
      this.y = this.center + this.amplitude * Math.sin(2 * Math.PI * this.t * this.frequency + this.phase);
      this.x = this.t;
    }
    return this.y;
  }
}
