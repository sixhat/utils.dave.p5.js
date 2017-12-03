class LSystem
  constructor: (@alphabet,@axiom,@rules) ->
    this.startString = @axiom
    this.endString = ''
    this.nIters = 0

  processString: (oldStr) ->
    newStr = ''
    newStr += (if @rules[c] then @rules[c] else c) for c in oldStr
    return newStr

  iterate: (nIters) ->
    if nIters < 1
      return @endStrig
    for n in [1..nIters]
      @endString = @processString(@startString)
      @startString = @endString
    @nIters += nIters
    return @endString

  addRule: (key, action) ->
    @rules[key]=action

  removeRule: (key) ->
    delete @rules[key]
