import { failure, success } from "../utils/helpers";
import { Parser } from "../models/types";
import { parseCharacter } from "./parsers";

// Checks if the input string starts with an open parenthesis "(".
// If found, returns an "OPEN_PARENTHESIS" token; otherwise, returns a failure.
export const parseOpenParenthesis: Parser = (input: string) => {
  if (input.startsWith('(')) {
    return success([{ type: 'OPEN_PARENTHESIS', value: '(' }], input.slice(1));
  }
  return failure(`Expected '('`);
};

// Checks if the input string starts with a close parenthesis ")".
// If found, returns a "CLOSE_PARENTHESIS" token; otherwise, returns a failure.
export const parseCloseParenthesis: Parser = (input: string) => {
  if (input.startsWith(')')) {
    return success([{ type: 'CLOSE_PARENTHESIS', value: ')' }], input.slice(1));
  }
  return failure(`Expected ')'`);
};

export const parseOpenParenthesis2 = parseCharacter('(', 'OPEN_PARENTHESIS');
export const parseCloseParenthesis2 = parseCharacter(')', 'CLOSE_PARENTHESIS');