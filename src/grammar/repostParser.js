// Generated from repost.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var repostListener = require('./repostListener').repostListener;
var grammarFileName = "repost.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u000e-\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0003",
    "\u0002\u0005\u0002\u0010\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0005\u0002\u0016\n\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007+",
    "\n\u0007\u0003\u0007\u0002\u0002\b\u0002\u0004\u0006\b\n\f\u0002\u0003",
    "\u0003\u0002\b\t\u0002*\u0002\u000f\u0003\u0002\u0002\u0002\u0004\u0017",
    "\u0003\u0002\u0002\u0002\u0006\u001b\u0003\u0002\u0002\u0002\b\u001f",
    "\u0003\u0002\u0002\u0002\n\"\u0003\u0002\u0002\u0002\f$\u0003\u0002",
    "\u0002\u0002\u000e\u0010\u0005\u0004\u0003\u0002\u000f\u000e\u0003\u0002",
    "\u0002\u0002\u000f\u0010\u0003\u0002\u0002\u0002\u0010\u0011\u0003\u0002",
    "\u0002\u0002\u0011\u0012\u0005\u0006\u0004\u0002\u0012\u0013\u0007\u000e",
    "\u0002\u0002\u0013\u0015\u0005\b\u0005\u0002\u0014\u0016\u0005\n\u0006",
    "\u0002\u0015\u0014\u0003\u0002\u0002\u0002\u0015\u0016\u0003\u0002\u0002",
    "\u0002\u0016\u0003\u0003\u0002\u0002\u0002\u0017\u0018\u0007\u000b\u0002",
    "\u0002\u0018\u0019\u0005\f\u0007\u0002\u0019\u001a\u0007\f\u0002\u0002",
    "\u001a\u0005\u0003\u0002\u0002\u0002\u001b\u001c\u0007\u000b\u0002\u0002",
    "\u001c\u001d\u0007\r\u0002\u0002\u001d\u001e\u0007\f\u0002\u0002\u001e",
    "\u0007\u0003\u0002\u0002\u0002\u001f \u0007\u0003\u0002\u0002 !\u0007",
    "\r\u0002\u0002!\t\u0003\u0002\u0002\u0002\"#\u0007\u0004\u0002\u0002",
    "#\u000b\u0003\u0002\u0002\u0002$%\u0007\u0005\u0002\u0002%&\t\u0002",
    "\u0002\u0002&*\u0007\n\u0002\u0002\'+\u0007\u0006\u0002\u0002()\u0007",
    "\u0007\u0002\u0002)+\u0005\f\u0007\u0002*\'\u0003\u0002\u0002\u0002",
    "*(\u0003\u0002\u0002\u0002*+\u0003\u0002\u0002\u0002+\r\u0003\u0002",
    "\u0002\u0002\u0005\u000f\u0015*"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'@end'", "'@endif'", null, "'||'", "'&&'", "'!='", 
                     "'=='", null, "'@if('", "')'" ];

var symbolicNames = [ null, null, null, "VARIABLE", "DISJUNCTION", "CONJUNCTION", 
                      "NOT", "EQUALS", "VALUE", "START_OPERATOR", "END_OPERATOR", 
                      "LANGUAGE", "TEXT" ];

var ruleNames =  [ "textblock", "begin_conditional", "begin_language", "end_language", 
                   "end_conditional", "expression" ];

function repostParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

repostParser.prototype = Object.create(antlr4.Parser.prototype);
repostParser.prototype.constructor = repostParser;

Object.defineProperty(repostParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

repostParser.EOF = antlr4.Token.EOF;
repostParser.T__0 = 1;
repostParser.T__1 = 2;
repostParser.VARIABLE = 3;
repostParser.DISJUNCTION = 4;
repostParser.CONJUNCTION = 5;
repostParser.NOT = 6;
repostParser.EQUALS = 7;
repostParser.VALUE = 8;
repostParser.START_OPERATOR = 9;
repostParser.END_OPERATOR = 10;
repostParser.LANGUAGE = 11;
repostParser.TEXT = 12;

repostParser.RULE_textblock = 0;
repostParser.RULE_begin_conditional = 1;
repostParser.RULE_begin_language = 2;
repostParser.RULE_end_language = 3;
repostParser.RULE_end_conditional = 4;
repostParser.RULE_expression = 5;

function TextblockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = repostParser.RULE_textblock;
    return this;
}

TextblockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TextblockContext.prototype.constructor = TextblockContext;

TextblockContext.prototype.begin_language = function() {
    return this.getTypedRuleContext(Begin_languageContext,0);
};

TextblockContext.prototype.TEXT = function() {
    return this.getToken(repostParser.TEXT, 0);
};

TextblockContext.prototype.end_language = function() {
    return this.getTypedRuleContext(End_languageContext,0);
};

TextblockContext.prototype.begin_conditional = function() {
    return this.getTypedRuleContext(Begin_conditionalContext,0);
};

TextblockContext.prototype.end_conditional = function() {
    return this.getTypedRuleContext(End_conditionalContext,0);
};

TextblockContext.prototype.enterRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.enterTextblock(this);
	}
};

TextblockContext.prototype.exitRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.exitTextblock(this);
	}
};




repostParser.TextblockContext = TextblockContext;

repostParser.prototype.textblock = function() {

    var localctx = new TextblockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, repostParser.RULE_textblock);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 13;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
        if(la_===1) {
            this.state = 12;
            this.begin_conditional();

        }
        this.state = 15;
        this.begin_language();
        this.state = 16;
        this.match(repostParser.TEXT);
        this.state = 17;
        this.end_language();
        this.state = 19;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===repostParser.T__1) {
            this.state = 18;
            this.end_conditional();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Begin_conditionalContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = repostParser.RULE_begin_conditional;
    return this;
}

Begin_conditionalContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Begin_conditionalContext.prototype.constructor = Begin_conditionalContext;

Begin_conditionalContext.prototype.START_OPERATOR = function() {
    return this.getToken(repostParser.START_OPERATOR, 0);
};

Begin_conditionalContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

Begin_conditionalContext.prototype.END_OPERATOR = function() {
    return this.getToken(repostParser.END_OPERATOR, 0);
};

Begin_conditionalContext.prototype.enterRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.enterBegin_conditional(this);
	}
};

Begin_conditionalContext.prototype.exitRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.exitBegin_conditional(this);
	}
};




repostParser.Begin_conditionalContext = Begin_conditionalContext;

repostParser.prototype.begin_conditional = function() {

    var localctx = new Begin_conditionalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, repostParser.RULE_begin_conditional);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 21;
        this.match(repostParser.START_OPERATOR);
        this.state = 22;
        this.expression();
        this.state = 23;
        this.match(repostParser.END_OPERATOR);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Begin_languageContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = repostParser.RULE_begin_language;
    return this;
}

Begin_languageContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Begin_languageContext.prototype.constructor = Begin_languageContext;

Begin_languageContext.prototype.START_OPERATOR = function() {
    return this.getToken(repostParser.START_OPERATOR, 0);
};

Begin_languageContext.prototype.LANGUAGE = function() {
    return this.getToken(repostParser.LANGUAGE, 0);
};

Begin_languageContext.prototype.END_OPERATOR = function() {
    return this.getToken(repostParser.END_OPERATOR, 0);
};

Begin_languageContext.prototype.enterRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.enterBegin_language(this);
	}
};

Begin_languageContext.prototype.exitRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.exitBegin_language(this);
	}
};




repostParser.Begin_languageContext = Begin_languageContext;

repostParser.prototype.begin_language = function() {

    var localctx = new Begin_languageContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, repostParser.RULE_begin_language);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 25;
        this.match(repostParser.START_OPERATOR);
        this.state = 26;
        this.match(repostParser.LANGUAGE);
        this.state = 27;
        this.match(repostParser.END_OPERATOR);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function End_languageContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = repostParser.RULE_end_language;
    return this;
}

End_languageContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
End_languageContext.prototype.constructor = End_languageContext;

End_languageContext.prototype.LANGUAGE = function() {
    return this.getToken(repostParser.LANGUAGE, 0);
};

End_languageContext.prototype.enterRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.enterEnd_language(this);
	}
};

End_languageContext.prototype.exitRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.exitEnd_language(this);
	}
};




repostParser.End_languageContext = End_languageContext;

repostParser.prototype.end_language = function() {

    var localctx = new End_languageContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, repostParser.RULE_end_language);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 29;
        this.match(repostParser.T__0);
        this.state = 30;
        this.match(repostParser.LANGUAGE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function End_conditionalContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = repostParser.RULE_end_conditional;
    return this;
}

End_conditionalContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
End_conditionalContext.prototype.constructor = End_conditionalContext;


End_conditionalContext.prototype.enterRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.enterEnd_conditional(this);
	}
};

End_conditionalContext.prototype.exitRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.exitEnd_conditional(this);
	}
};




repostParser.End_conditionalContext = End_conditionalContext;

repostParser.prototype.end_conditional = function() {

    var localctx = new End_conditionalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, repostParser.RULE_end_conditional);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 32;
        this.match(repostParser.T__1);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = repostParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.VARIABLE = function() {
    return this.getToken(repostParser.VARIABLE, 0);
};

ExpressionContext.prototype.VALUE = function() {
    return this.getToken(repostParser.VALUE, 0);
};

ExpressionContext.prototype.NOT = function() {
    return this.getToken(repostParser.NOT, 0);
};

ExpressionContext.prototype.EQUALS = function() {
    return this.getToken(repostParser.EQUALS, 0);
};

ExpressionContext.prototype.DISJUNCTION = function() {
    return this.getToken(repostParser.DISJUNCTION, 0);
};

ExpressionContext.prototype.CONJUNCTION = function() {
    return this.getToken(repostParser.CONJUNCTION, 0);
};

ExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

ExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.enterExpression(this);
	}
};

ExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof repostListener ) {
        listener.exitExpression(this);
	}
};




repostParser.ExpressionContext = ExpressionContext;

repostParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, repostParser.RULE_expression);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 34;
        this.match(repostParser.VARIABLE);
        this.state = 35;
        _la = this._input.LA(1);
        if(!(_la===repostParser.NOT || _la===repostParser.EQUALS)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
        this.state = 36;
        this.match(repostParser.VALUE);
        this.state = 40;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
        case repostParser.DISJUNCTION:
        	this.state = 37;
        	this.match(repostParser.DISJUNCTION);
        	break;
        case repostParser.CONJUNCTION:
        	this.state = 38;
        	this.match(repostParser.CONJUNCTION);
        	this.state = 39;
        	this.expression();
        	break;
        case repostParser.END_OPERATOR:
        	break;
        default:
        	break;
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.repostParser = repostParser;
