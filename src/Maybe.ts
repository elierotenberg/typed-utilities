export enum MaybeTag {
  Some = "some",
  None = "none",
}

export type Some<T> = [tag: MaybeTag.Some, value: T];
export type None = [tag: MaybeTag.None];

export type Maybe<T> = Some<T> | None;

export const some = <T>(value: T): Some<T> => [MaybeTag.Some, value];
export const none = (): None => [MaybeTag.None];
export const map = <T, U>(
  maybe: Maybe<T>,
  fn: (value: T) => Maybe<U>,
): Maybe<U> => (isSome(maybe) ? fn(maybe[1]) : none());

export const valueOf = <T>(some: Some<T>): T => some[1];

export function isNone(maybe: Maybe<unknown>): maybe is None {
  return maybe[0] === MaybeTag.None;
}

export function isSome<T>(maybe: Maybe<T>): maybe is Some<T> {
  return maybe[0] === MaybeTag.Some;
}

export const valuesOf = <T>(t: Maybe<T>[]): T[] =>
  t.filter(isSome).map(valueOf);
