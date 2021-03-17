import * as Either from "./Either";

import { Result } from ".";
export type Ok<Value = unknown> = Either.Left<Value>;
export type Err<Error = unknown> = Either.Right<Error>;
export type Result<Value = unknown, Error = unknown> = Ok<Value> | Err<Error>;

function isOk<Value = unknown>(
  result: Result<Value, unknown>,
): result is Ok<Value> {
  return Either.is.left(result);
}

function assertOk<Value = unknown>(
  result: Result<Value, unknown>,
  message?: string,
): asserts result is Ok<Value> {
  if (!isOk(result)) {
    throw new TypeError(message ?? "result should be 'ok'");
  }
}

function isErr<Error = unknown>(
  result: Result<unknown, Error>,
): result is Err<Error> {
  return Either.is.right(result);
}

function assertErr<Error = unknown>(
  result: Result<unknown, Error>,
  message?: string,
): asserts result is Err<Error> {
  if (!isErr(result)) {
    throw new TypeError(message ?? "result should be 'err'");
  }
}

const toOkValue = <Value = unknown>(result: Ok<Value>): Value => result[1];
const toErrError = <Error = unknown>(result: Err<Error>): Error => result[1];

export const is = {
  ok: isOk,
  err: isErr,
};

export const assert = {
  ok: assertOk,
  err: assertErr,
};

export const of = {
  ok: <Value = unknown>(value: Value): Ok<Value> => Either.of.left(value),
  err: <Error = unknown>(error: Error): Err => Either.of.right(error),
};

export const to = {
  okValue: toOkValue,
  errError: toErrError,
};

type Match<IfOk, IfErr, Value = unknown, Error = unknown> = {
  readonly ok: (value: Value) => IfOk;
  readonly err: (error: Error) => IfErr;
};

export const match = <IfOk, IfErr, Value = unknown, Error = unknown>(
  result: Result<Value, Error>,
  match: Match<IfOk, IfErr, Value, Error>,
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
