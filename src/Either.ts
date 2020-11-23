enum EitherTag {
  Left = "left",
  Right = "right",
}

export type Left<T> = [tag: EitherTag.Left, value: T];
export type Right<T> = [tag: EitherTag.Right, value: T];
export type Either<L, R> = Left<L> | Right<R>;

export function isLeft<L>(either: Either<L, unknown>): either is Left<L> {
  return either[0] === EitherTag.Left;
}

export function isRight<R>(either: Either<unknown, R>): either is Right<R> {
  return either[0] === EitherTag.Right;
}

export const of = {
  left: <L>(value: L): Left<L> => [EitherTag.Left, value],
  right: <R>(value: R): Right<R> => [EitherTag.Right, value],
};

export type Match<L, R, IfLeft, IfRight> = {
  readonly left: (value: L) => IfLeft;
  readonly right: (value: R) => IfRight;
};

export const match = <L, R, IfLeft, IfRight>(
  either: Either<L, R>,
  match: Match<L, R, IfLeft, IfRight>,
): IfLeft | IfRight =>
  isLeft(either) ? match.left(either[1]) : match.right(either[1]);

export const leftOf = <L>(either: Left<L>): L => either[1];
export const rightOf = <R>(either: Right<R>): R => either[1];
