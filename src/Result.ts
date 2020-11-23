import * as Either from "./Either";

import { Result } from ".";
export type Ok<T> = Either.Left<T>;
export type Err = Either.Right<Error>;
export type Result<T> = Ok<T> | Err;

export function isOk<T>(result: Result<T>): result is Ok<T> {
  return Either.isLeft(result);
}

export function isErr(result: Result<unknown>): result is Err {
  return Either.isRight(result);
}

export const of = {
  ok: <T>(value: T): Ok<T> => Either.of.left(value),
  err: (error: Error): Err => Either.of.right(error),
};

type Match<T, IfOk, IfErr> = {
  readonly ok: (value: T) => IfOk;
  readonly err: (error: Error) => IfErr;
};

export const match = <T, IfOk, IfErr>(
  result: Result<T>,
  match: Match<T, IfOk, IfErr>,
): IfOk | IfErr => (isOk(result) ? match.ok(result[1]) : match.err(result[1]));

export const valueOf = <T>(result: Ok<T>): T => result[1];
export const errorOf = (result: Err): Error => result[1];

export const tryCatch = <T>(fn: () => T): Result<T> => {
  try {
    return of.ok(fn());
  } catch (error) {
    return of.err(error);
  }
};
