grammar repost;

/**
    Parser rules
 */

textblock : begin_conditional? begin_language TEXT end_language end_conditional?; 

begin_conditional : START_OPERATOR expression END_OPERATOR;

begin_language : START_OPERATOR LANGUAGE END_OPERATOR;

end_language : '@end' LANGUAGE;

end_conditional : '@endif'; 

expression: VARIABLE (NOT | EQUALS) VALUE (DISJUNCTION | CONJUNCTION expression)?;

/**
    Lexer rules
    Lexer takes individual chars and transforms them into tokens
    Lexer rules are written in uppercase
 */

 VARIABLE : [a-z]+;
 DISJUNCTION : '||';
 CONJUNCTION : '&&';
 NOT : '!=';
 EQUALS : '==';
 VALUE : [a-z,0-9];
 START_OPERATOR : '@if(';
 END_OPERATOR : ')';
 LANGUAGE : 'en' | 'nl';
 TEXT : [a-z]+;