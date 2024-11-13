import { parseCloseParenthesis, parseNumber, parseOpenParenthesis, parseOperator } from "./parsers";
import { choiceN, doUntil } from "./parsers";

const parseAnyToken = choiceN([
  parseNumber,
  parseOperator,
  parseOpenParenthesis,
  parseCloseParenthesis
]);

export const tokenizer = doUntil(parseAnyToken);