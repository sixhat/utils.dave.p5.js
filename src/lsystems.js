// Generated by CoffeeScript 2.0.3
var LSystem;

LSystem = class LSystem {
  constructor(alphabet, axiom, rules) {
    this.alphabet = alphabet;
    this.axiom = axiom;
    this.rules = rules;
    this.startString = this.axiom;
    this.endString = '';
    this.nIters = 0;
  }

  processString(oldStr) {
    var c, i, len, newStr;
    newStr = '';
    for (i = 0, len = oldStr.length; i < len; i++) {
      c = oldStr[i];
      newStr += (this.rules[c] ? this.rules[c] : c);
    }
    return newStr;
  }

  iterate(nIters) {
    var i, n, ref;
    if (nIters < 1) {
      return this.endStrig;
    }
    for (n = i = 1, ref = nIters; 1 <= ref ? i <= ref : i >= ref; n = 1 <= ref ? ++i : --i) {
      this.endString = this.processString(this.startString);
      this.startString = this.endString;
    }
    this.nIters += nIters;
    return this.endString;
  }

  addRule(key, action) {
    return this.rules[key] = action;
  }

  removeRule(key) {
    return delete this.rules[key];
  }

};
