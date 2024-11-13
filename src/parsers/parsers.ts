import { Parser, Result, Token } from "../models/types";
import { failure, success } from "../utils/helpers";

// Generic function to parse a specific character from the start of the input string
// Returns A parser function that parses the specified character and returns the appropriate token
export const parseCharacter = (char: string, tokenType: Token['type']): Parser => {
  return (input: string) => {
    if (input.startsWith(char)) {
      return success([{ type: tokenType, value: char }], input.slice(1));
    }
    return failure(`Expected '${char}' character but found '${input[0]}'`);
  };
};

// Tries to parse the input using the first parser.
// If the first parser fails, tries the second parser.
export const choice = (p1: Parser, p2: Parser): Parser => {
  return (input: string): Result => {
    const result1 = p1(input);
    const result2 = p2(input);

    // Return the first matched result
    if (result1.success) {
      return result1;
    } else if (result2.success) {
      return result2;
    }

    return {
      success: false,
      reason: 'Choice parser: All choices failed on input'
    };
  };
};

// Tries to parse the input using each parser in the parsers array sequentially.
// Returns the result of the first parser that succeeds.
// If all parsers fail, returns the failure result with all errors.
export const choiceN = (parsers: Parser[]): Parser => {
  return (input: string): Result => {
    const results = parsers.map(parser => parser(input));

    // Find the first success result and return if exists
    const successResult = results.find(result => result.success);

    if (successResult) {
      return successResult;
    }

    return {
      success: false,
      reason: 'Choice parser: All choices failed on input'
    };
  };
};

// Combines two parsers by applying them sequentially to the input.
// If both parsers succeed, returns a combined success result with tokens from both parsers.
// If either parser fails, returns a failure result from the first failing parser.
export const zip = (parser1: Parser, parser2: Parser): Parser => {
  return (input: string): Result => {
    // Apply the first parser and return false if no success
    const resultA = parser1(input);
    if (!resultA.success) {
      return resultA;
    }

    // Apply the second parser to the remaining input and return false if no success
    const resultB = parser2(resultA.rest);
    if (!resultB.success) {
      return resultB;
    }

    // Combine tokens from both parsers if both succeed
    const combinedTokens: Token[] = [...resultA.value, ...resultB.value];
    return {
      success: true,
      value: combinedTokens,
      rest: resultB.rest,
    };
  };
};

export const isEmpty = (input: string): Result => {
  return input === '' ? success([], '') : failure('Not an empty string');
}

// Applying a parser until it fails or the input string becomes empty
export const doUntil = (parser: Parser): Parser => {
  const recursiveParse = (input: string, accumulatedTokens: Token[]): Result => {
    if (isEmpty(input).success) {
      return { success: true, value: accumulatedTokens, rest: input };
    }

    const result = parser(input);

    // Return failed result if there is no any success accumulated (failed on first character check)
    // Return success result on first fail after getting some success
    if (!result.success) {
      return accumulatedTokens.length ? { success: true, value: accumulatedTokens, rest: input } : result;
    }

    // Continue parsing with the rest of the input and accumulated tokens if there is no fail yet
    return recursiveParse(result.rest, [...accumulatedTokens, ...result.value]);
  };

  // Start the recursive parsing with an empty token array
  return (input: string) => recursiveParse(input, []);
};