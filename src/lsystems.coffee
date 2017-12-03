class LSystem
  constructor: (alphabet,axiom,rules) ->
    this.alphabet = alphabet
    this.axiom = axiom
    this.startString = axiom
    this.endString = ''
    this.rules = rules
    this.nIters = 0

  processString: (oldStr) ->
    newStr = ''
    newStr += (if this.rules[c] then this.rules[c] else c) for c in oldStr
    return newStr

  iterate: (nIters) ->
    if nIters < 1
      return this.endStrig
    for n in [1..nIters]
      this.endString = this.processString(this.startString)
      this.startString = this.endString
    this.nIters += nIters
    return this.endString

  addRule: (key, action) ->
    this.rules[key]=action

  removeRule: (key) ->
    delete this.rules[key]  
