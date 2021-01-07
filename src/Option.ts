import * as Either from "./Either";

export type Option<T> = Either.Either<T, null>;

export type Some<T> = Either.Left<T>;
export type None = Either.Right<null>;

function isSome<T>(option: Option<T>): option is Some<T> {
  return Either.is.left(option);
}

function assertSome<T>(
  option: Option<T>,
  message?: string,
): asserts option is Some<T> {
  if (!isSome(option)) {
    throw new TypeError(message ?? "option should be 'some'");
  }
}

function isNone(option: Option<unknown>): option is None {
  return Either.is.right(option);
}

function assertNone(
  option: Option<unknown>,
  message?: string,
): asserts option is None {
  if (!isNone(option)) {
    throw new TypeError(message ?? "option should be 'none'");
  }
}
const toSomeValue = <T>(option: Some<T>): T => option[1];

export const is = {
  some: isSome,
  none: isNone,
};

export const assert = {
  some: assertSome,
  none: assertNone,
};

export const of = {
  some: <T>(value: T): Some<T> => Either.of.left(value),
  none: (): None => Either.of.right(null),
};

export const to = {
  someValue: toSomeValue,
};

type Match<T, IfSome, IfNone> = {
  readonly some: (value: T) => IfSome;
  readonly none: () => IfNone;
};

export const match = <T, IfSome, IfNone>(
  option: Option<T>,
  match: Match<T, IfSome, IfNone>,
): IfSome | IfNone => (isSome(option) ? match.some(option[1]) : match.none());
