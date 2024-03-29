import { Either, Left, Right } from "./Either";

export type Ok<Value = unknown> = Left<Value>;
export type Err<Error = unknown> = Right<Error>;
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
    throw new TypeError(message ?? `result should be 'ok'`);
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
    throw new TypeError(message ?? `result should be 'err'`);
  }
}

const toOkValue = <Value = unknown>(result: Ok<Value>): Value => result[1];
const toErrError = <Error = unknown>(result: Err<Error>): Error => result[1];

const is = {
  ok: isOk,
  err: isErr,
};

const assert = {
  ok: assertOk,
  err: assertErr,
};

const of = {
  ok: <Value = unknown>(value: Value): Ok<Value> => Either.of.left(value),
  err: <Error = unknown>(error: Error): Err => Either.of.right(error),
};

const to = {
  okValue: toOkValue,
  errError: toErrError,
};

type Match<IfOk, IfErr, Value = unknown, Error = unknown> = {
  readonly ok: (value: Value) => IfOk;
  readonly err: (error: Error) => IfErr;
};

const match = <IfOk, IfErr, Value = unknown, Error = unknown>(
  result: Result<Value, Error>,
  match: Match<IfOk, IfErr, Value, Error>,
): IfOk | IfErr => (isOk(result) ? match.ok(result[1]) : match.err(result[1]));

const tryCatch = <T>(fn: () => T): Result<T> => {
  try {
    return of.ok(fn());
  } catch (error) {
    return of.err(error);
  }
};

const tryCatchAsync = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    return of.ok(await fn());
  } catch (error) {
    return of.err(error);
  }
};

export const Result = {
  is,
  assert,
  of,
  to,
  match,
  tryCatch,
  tryCatchAsync,
};
