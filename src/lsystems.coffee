class LSystem
  ###*
  * LSystem Generator
  * @param  {string} alphabet - the characters recognized by the LSystem
  * @param  {string} axiom - The starting axiom of The LSystem generator
  * @param  {object} rules - a dictionary mapping letters to rules of LSystems
  ###
  constructor: (@alphabet, @axiom, @rules) ->
    this.startString = @axiom
    this.endString = ''
    this.nIters = 0

  ###* Processes the Current String according to the rules in the LSystem
   * @param {string} oldStr the string to be processed
   * @return {string} the processede string
  ###
  processString: (oldStr) ->
    newStr = ''
    newStr += (if @rules[c] then @rules[c] else c) for c in oldStr
    return newStr

  ###*
  * Iterates the LSystems 
  * @param {number} nIters - Number of interations to compute
  ###
  iterate: (nIters) ->
    if nIters < 1
      return @endStrig
    for n in [1..nIters]
      @endString = @processString(@startString)
      @startString = @endString
    @nIters += nIters
    return @endString

  ###* Add an extra Rule to the LSystem
   * @param {string} key - the rule to add
   * @param {string} action - the action to perform with this rule
  ###
  addRule: (key, action) ->
    @rules[key] = action

  ###* Removes a rule from the LSystem
   * @param {string} key - the rule to remove
  ###
  removeRule: (key) ->
    delete @rules[key]

