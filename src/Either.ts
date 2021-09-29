enum EitherTag {
  Left = `left`,
  Right = `right`,
}

export type Left<T> = [tag: EitherTag.Left, value: T];
export type Right<T> = [tag: EitherTag.Right, value: T];
export type Either<L, R> = Left<L> | Right<R>;

function isLeft<L>(either: Either<L, unknown>): either is Left<L> {
  return either[0] === EitherTag.Left;
}

function assertLeft<L>(
  either: Either<L, unknown>,
  message?: string,
): asserts either is Left<L> {
  if (!isLeft(either)) {
    throw new TypeError(message ?? `either should be 'left'`);
  }
}

function isRight<R>(either: Either<unknown, R>): either is Right<R> {
  return either[0] === EitherTag.Right;
}

function assertRight<R>(
  either: Either<unknown, R>,
  message?: string,
): asserts either is Right<R> {
  if (!isRight(either)) {
    throw new TypeError(message ?? `either should be 'right'`);
  }
}

const toLeftValue = <L>(either: Left<L>): L => either[1];
const toRightValue = <R>(either: Right<R>): R => either[1];

const is = {
  left: isLeft,
  right: isRight,
};

const to = {
  leftValue: toLeftValue,
  rightValue: toRightValue,
};

const assert = {
  left: assertLeft,
  right: assertRight,
};

const of = {
  left: <L>(value: L): Left<L> => [EitherTag.Left, value],
  right: <R>(value: R): Right<R> => [EitherTag.Right, value],
};

export type Match<L, R, IfLeft, IfRight> = {
  readonly left: (value: L) => IfLeft;
  readonly right: (value: R) => IfRight;
};

const match = <L, R, IfLeft, IfRight>(
  either: Either<L, R>,
  match: Match<L, R, IfLeft, IfRight>,
): IfLeft | IfRight =>
  isLeft(either) ? match.left(either[1]) : match.right(either[1]);

export const Either = {
  is,
  to,
  assert,
  of,
  match,
};
