var LSystem

LSystem = class LSystem {
	/**
	 * LSystem Generator
	 * @param  {string} alphabet - the characters recognized by the LSystem
	 * @param  {string} axiom - The starting axiom of The LSystem generator
	 * @param  {object} rules - a dictionary mapping letters to rules of LSystems
	 */
	constructor(alphabet, axiom, rules) {
		this.alphabet = alphabet
		this.axiom = axiom
		this.rules = rules
		this.startString = this.axiom
		this.endString = ""
		this.nIters = 0
	}

	/** Processes the Current String according to the rules in the LSystem
	 * @param {string} oldStr the string to be processed
	 * @return {string} the processed string
	 */
	processString(oldStr) {
		var c, i, len, newStr
		newStr = ""
		for (i = 0, len = oldStr.length; i < len; i++) {
			c = oldStr[i]
			newStr += this.rules[c] ? this.rules[c] : c
		}
		return newStr
	}

	/**
	 * Iterates the LSystems
	 * @param {number} nIters - Number of interations to compute
	 * @return {string} The iterated resulting string.
	 */
	iterate(nIters) {
		if (nIters < 1) {
			return this.endString
		}
		for (let i = 0; i < nIters; i++) {
			this.endString = this.processString(this.startString)
			this.startString = this.endString
		}
		this.nIters += nIters
		return this.endString
	}

	/** Add an extra Rule to the LSystem
	 * @param {string} key - the rule to add
	 * @param {string} action - the action to perform with this rule
	 */
	addRule(key, action) {
		return (this.rules[key] = action)
	}

	/** Removes a rule from the LSystem
	 * @param {string} key - the rule to remove
	 */
	removeRule(key) {
		return delete this.rules[key]
	}
}
