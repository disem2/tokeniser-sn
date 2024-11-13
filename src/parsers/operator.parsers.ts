import { Parser } from "../models/types";
import { failure, success } from "../utils/helpers";
import { choice, parseCharacter } from "./parsers";

// Checks if the input string starts with an operator ("+" or "-").
// If found, returns an "OPERATOR" token; otherwise, returns a failure.
export const parseOperator: Parser = (input: string) => {
  const match = /^[+-]/.exec(input);
  if (match) {
    return success([{ type: 'OPERATOR', value: match[0] }], input.slice(1));
  }
  return failure(`Expected '+ or -'`);
};

export const parseOperator2 = choice(parseCharacter('+', 'OPERATOR'), parseCharacter('-', 'OPERATOR'));
