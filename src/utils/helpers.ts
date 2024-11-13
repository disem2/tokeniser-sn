import { Result, Token } from "../models/types";

export const success = (value: Token[], rest: string): Result => ({
  success: true,
  value,
  rest,
});

export const failure = (reason: string): Result => ({
  success: false,
  reason,
});



