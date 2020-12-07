import * as Either from "./Either";

import { Result } from ".";
export type Ok<T> = Either.Left<T>;
export type Err = Either.Right<Error>;
export type Result<T> = Ok<T> | Err;

function isOk<T>(result: Result<T>): result is Ok<T> {
  return Either.is.left(result);
}

function assertOk<T>(
  result: Result<T>,
  message?: string,
): asserts result is Ok<T> {
  if (!isOk(result)) {
    throw new TypeError(message ?? "result should be 'ok'");
  }
}

function isErr(result: Result<unknown>): result is Err {
  return Either.is.right(result);
}

function assertErr(
  result: Result<unknown>,
  message?: string,
): asserts result is Err {
  if (!isErr(result)) {
    throw new TypeError(message ?? "result should be 'err'");
  }
}

const toOkValue = <T>(result: Ok<T>): T => result[1];
const toErrError = (result: Err): Error => result[1];

export const is = {
  ok: isOk,
  err: isErr,
};

export const assert = {
  ok: assertOk,
  err: assertErr,
};

export const of = {
  ok: <T>(value: T): Ok<T> => Either.of.left(value),
  err: (error: Error): Err => Either.of.right(error),
};

export const to = {
  okValue: toOkValue,
  errError: toErrError,
};

type Match<T, IfOk, IfErr> = {
  readonly ok: (value: T) => IfOk;
  readonly err: (error: Error) => IfErr;
};

export const match = <T, IfOk, IfErr>(
  result: Result<T>,
  match: Match<T, IfOk, IfErr>,
): IfOk | IfErr => (isOk(result) ? match.ok(result[1]) : match.err(result[1]));

export const tryCatch = <T>(fn: () => T): Result<T> => {
  try {
    return of.ok(fn());
  } catch (error) {
    return of.err(error);
  }
};

export const tryCatchAsync = async <T>(
  fn: () => Promise<T>,
): Promise<Result<T>> => {
  try {
    return of.ok(await fn());
  } catch (error) {
    return of.err(error);
  }
};
