import * as Either from "./Either";

export type Option<T> = Either.Either<T, null>;

export type Some<T> = Either.Left<T>;
export type None = Either.Right<null>;

export function isSome<T>(maybe: Option<T>): maybe is Some<T> {
  return Either.isLeft(maybe);
}

export function isNone(maybe: Option<unknown>): maybe is None {
  return Either.isRight(maybe);
}

export const of = {
  some: <T>(value: T): Some<T> => Either.of.left(value),
  none: (): None => Either.of.right(null),
};

type Match<T, IfSome, IfNone> = {
  readonly some: (value: T) => IfSome;
  readonly none: () => IfNone;
};

export const match = <T, IfSome, IfNone>(
  maybe: Option<T>,
  match: Match<T, IfSome, IfNone>,
): IfSome | IfNone => (isSome(maybe) ? match.some(maybe[1]) : match.none());

export const valueOf = <T>(maybe: Some<T>): T => maybe[1];
