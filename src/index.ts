import {
  parseCloseParenthesis,
  parseCloseParenthesis2,
  parseNumber,
  parseOpenParenthesis,
  parseOpenParenthesis2,
  parseOperator,
  parseOperator2
} from "./parsers";
import {
  choice,
  choiceN, doUntil,
  parseCharacter, zip
} from "./parsers";
import {tokenizer} from "./tokenizer";

// 15
console.log('parseOperator("+")', parseOperator("+"));
console.log('parseOperator("1 +")', parseOperator("1 +"));
console.log('parseOperator("+ 2")', parseOperator("+ 2"));

// 16
console.log('parseOpenParenthesis("(")', parseOpenParenthesis("("));
console.log('parseOpenParenthesis("+ (")', parseOpenParenthesis("+ ("));
console.log('parseOpenParenthesis(")")', parseOpenParenthesis(")"));

// 17
console.log('parseCloseParenthesis(")")', parseCloseParenthesis(")"));
console.log('parseCloseParenthesis("+ )")', parseCloseParenthesis("+ )"));
console.log('parseCloseParenthesis("()")', parseCloseParenthesis("()"));

// 18
console.log(`parseCharacter('+', 'OPERATOR')`, parseCharacter('+', 'OPERATOR')('+12'));
console.log(`parseCharacter('+', 'CLOSE_PARENTHESIS')`, parseCharacter(')', 'CLOSE_PARENTHESIS')('(123'));

// 19
console.log('parseOpenParenthesis2("(")', parseOpenParenthesis2("("));
console.log('parseOpenParenthesis2("+ (")', parseOpenParenthesis2("+ ("));
console.log('parseCloseParenthesis2(")")', parseCloseParenthesis2(")"));
console.log('parseCloseParenthesis2("+ )")', parseCloseParenthesis2("+ )"));

// 20
console.log(`choice(parseNumber, parseOperator)('1+2')`, choice(parseNumber, parseOperator)('1+2'));
console.log(`choice(parseNumber, parseOperator)('+2')`, choice(parseNumber, parseOperator)('+2'));
console.log(`choice(parseNumber, parseOperator)('(+')`, choice(parseNumber, parseOperator)('(+'));

// 21
console.log(`parseOperator2('+')`, parseOperator2('+'));
console.log(`parseOperator2('1 +')`, parseOperator2('1 +'));
console.log(`parseOperator2('+ 2')`, parseOperator2('+ 2'));

// 22
console.log(`choiceN([parseNumber, parseOpenParenthesis, parseOperator])('1 + 2')`, choiceN([parseNumber, parseOpenParenthesis, parseOperator])('1 + 2'));
console.log(`choiceN([parseNumber, parseOpenParenthesis, parseOperator])(')1 + 2("')`, choiceN([parseNumber, parseOpenParenthesis, parseOperator])(')1 + 2("'));

// 23
console.log('zip(parseNumber, parseOperator)("1+")', zip(parseNumber, parseOperator)("1+"));
console.log('zip(parseNumber, parseOperator)("+1")', zip(parseNumber, parseOperator)("+1"));
console.log('zip(parseNumber, parseOperator)("1+2+3");', zip(parseNumber, parseOperator)("1+2+3"));

// 24
console.log('doUntil(choiceN([parseNumber, parseOperator]))("1+2")', doUntil(choiceN([parseNumber, parseOperator]))(""));
console.log('doUntil(choiceN([parseNumber, parseOperator]))("1+2")', doUntil(choiceN([parseNumber, parseOperator]))("1+2"));
// There is an error in the task description. Next check might be success, because we have '1' first
console.log('doUntil(choiceN([parseNumber, parseOperator]))("1+(")', doUntil(choiceN([parseNumber, parseOperator]))("1+("));
console.log('doUntil(choiceN([parseNumber, parseOperator]))("1+(")', doUntil(choiceN([parseNumber, parseOperator]))("ss1+("));

// 25
console.log(`tokenizer('1+2')`, tokenizer('1+2'));
console.log(`tokenizer('+12')`, tokenizer('+12'));
console.log(`tokenizer('(123')`, tokenizer('(123'));
console.log(`tokenizer('ddd2)')`, tokenizer('ddd2)'));
console.log(`tokenizer(')3ff')`, tokenizer(')3ff'));
