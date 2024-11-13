import { Parser } from "../models/types";
import { failure, success } from "../utils/helpers";

// Attempts to parse a sequence of digits at the beginning of the input string.
// If successful, returns a "NUMBER" token; otherwise, returns a failure.
export const parseNumber: Parser = (input: string) => {
  const match = /^\d+/.exec(input);
  if (match) {
    return success([{ type: 'NUMBER', value: match[0] }], input.slice(match[0].length));
  }
  return failure('Not a number');
};
