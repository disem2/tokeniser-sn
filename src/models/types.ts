export type Token = {
  type: 'NUMBER' | 'OPERATOR' | 'OPEN_PARENTHESIS' | 'CLOSE_PARENTHESIS';
  value: string;
};

export type Success = {
  success: true;
  value: Token[];
  rest: string;
};

export type Failure = {
  success: false;
  reason: string;
};

export type Result = Success | Failure;

export type Parser = (input: string) => Result;