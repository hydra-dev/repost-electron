// Generated from repost.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by repostParser.
function repostListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

repostListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
repostListener.prototype.constructor = repostListener;

// Enter a parse tree produced by repostParser#textblock.
repostListener.prototype.enterTextblock = function(ctx) {
};

// Exit a parse tree produced by repostParser#textblock.
repostListener.prototype.exitTextblock = function(ctx) {
};


// Enter a parse tree produced by repostParser#begin_conditional.
repostListener.prototype.enterBegin_conditional = function(ctx) {
};

// Exit a parse tree produced by repostParser#begin_conditional.
repostListener.prototype.exitBegin_conditional = function(ctx) {
};


// Enter a parse tree produced by repostParser#begin_language.
repostListener.prototype.enterBegin_language = function(ctx) {
};

// Exit a parse tree produced by repostParser#begin_language.
repostListener.prototype.exitBegin_language = function(ctx) {
};


// Enter a parse tree produced by repostParser#end_language.
repostListener.prototype.enterEnd_language = function(ctx) {
};

// Exit a parse tree produced by repostParser#end_language.
repostListener.prototype.exitEnd_language = function(ctx) {
};


// Enter a parse tree produced by repostParser#end_conditional.
repostListener.prototype.enterEnd_conditional = function(ctx) {
};

// Exit a parse tree produced by repostParser#end_conditional.
repostListener.prototype.exitEnd_conditional = function(ctx) {
};


// Enter a parse tree produced by repostParser#expression.
repostListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by repostParser#expression.
repostListener.prototype.exitExpression = function(ctx) {
};



exports.repostListener = repostListener;