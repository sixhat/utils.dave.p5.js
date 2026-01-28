class ContextFreeGrammar {
    // This version has to do token expansion instead of letter expansion
    // This means rules are:
    // <token> -> x | y | z
    //
    // The best way to impletement this is probably in the form of a
    // dictionary with tokens
    //
    // { 
    //      "token" : ['x', 'y', 'z'] ,
    //      "token2" : ['x', 'y', 'z'] ,
    // }
    //
    // it then needs to recursively expand the axiom but the expansion has to
    // be limited by a number of instances limiter to avoid exploding.
}
