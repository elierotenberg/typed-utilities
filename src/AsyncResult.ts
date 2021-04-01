import AggregateError from "aggregate-error";

import { AsyncResult } from ".";

enum AsyncResultTag {
  Pending = "pending",
  Resolved = "resolved",
  Rejected = "rejected",
}

export type Pending = [tag: AsyncResultTag.Pending];
export type Rejected<Error> = [tag: AsyncResultTag.Rejected, error: Error];
export type Resolved<Value> = [tag: AsyncResultTag.Resolved, value: Value];
export type AsyncResult<Value = unknown, Error = unknown> =
  | Pending
  | Rejected<Error>
  | Resolved<Value>;

function isPending(result: AsyncResult<unknown, unknown>): result is Pending {
  return result[0] === AsyncResultTag.Pending;
}

function assertPending(
  result: AsyncResult<unknown, unknown>,
  message?: string,
): asserts result is Pending {
  if (!isPending(result)) {
    throw new TypeError(message ?? "asyncValue should be 'pending'");
  }
}

function isRejected<Error = unknown>(
  result: AsyncResult<unknown, Error>,
): result is Rejected<Error> {
  return result[0] === AsyncResultTag.Rejected;
}

function assertRejected<Error = unknown>(
  result: AsyncResult<unknown, Error>,
  message?: string,
): asserts result is Rejected<Error> {
  if (!isRejected(result)) {
    throw new TypeError(message ?? "asyncValue should be 'rejected'");
  }
}

function isResolved<Value = unknown>(
  result: AsyncResult<Value, unknown>,
): result is Resolved<Value> {
  return result[0] === AsyncResultTag.Resolved;
}

function assertResolved<Value = unknown>(
  result: AsyncResult<Value>,
  message?: string,
): asserts result is Resolved<Value> {
  if (!isResolved(result)) {
    throw new TypeError(message ?? "asyncValue should be 'resolved'");
  }
}

const resolvedValue = <Value = unknown>(resolved: Resolved<Value>): Value =>
  resolved[1];
const rejectedError = <Error = unknown>(rejected: Rejected<Error>): Error =>
  rejected[1];

export const is = {
  pending: isPending,
  rejected: isRejected,
  resolved: isResolved,
};

export const assert = {
  pending: assertPending,
  rejected: assertRejected,
  resolved: assertResolved,
};

export const of = {
  pending: (): Pending & AsyncResult<never, never> => [AsyncResultTag.Pending],
  rejected: <Error = unknown>(
    error: Error,
  ): Rejected<Error> & AsyncResult<never, Error> => [
    AsyncResultTag.Rejected,
    error,
  ],
  resolved: <Value = unknown>(
    value: Value,
  ): Resolved<Value> & AsyncResult<Value, never> => [
    AsyncResultTag.Resolved,
    value,
  ],
};

export const to = {
  resolvedValue,
  rejectedError,
};

type Match<
  IfPending,
  IfRejected,
  IfResolved,
  Value = unknown,
  Error = unknown
> = {
  readonly pending: () => IfPending;
  readonly rejected: (error: Error) => IfRejected;
  readonly resolved: (value: Value) => IfResolved;
};

export const match = <
  IfPending,
  IfRejected,
  IfResolved,
  Value = unknown,
  Error = unknown
>(
  result: AsyncResult<Value, Error>,
  match: Match<IfPending, IfRejected, IfResolved, Value, Error>,
): IfPending | IfRejected | IfResolved =>
  isPending(result)
    ? match.pending()
    : isRejected(result)
    ? match.rejected(to.rejectedError(result))
    : match.resolved(to.resolvedValue(result));

type DefaultError<T> = T extends Error ? T : Error;

type Join = {
  (values: readonly []): AsyncResult<[]>;
  <V1, E1 = unknown>(values: readonly [AsyncResult<V1, E1>]): AsyncResult<
    [V1],
    AggregateError<DefaultError<E1>>
  >;
  <V1, V2, E1 = unknown, E2 = unknown>(
    values: readonly [AsyncResult<V1, E1>, AsyncResult<V2, E2>],
  ): AsyncResult<[V1, V2], AggregateError<DefaultError<E1> | DefaultError<E2>>>;
  <V1, E1, V2, E2, V3, E3>(
    values: readonly [
      AsyncResult<V1, E1>,
      AsyncResult<V2, E2>,
      AsyncResult<V3, E3>,
    ],
  ): AsyncResult<
    [V1, V2, V3],
    AggregateError<DefaultError<E1> | DefaultError<E2> | DefaultError<E3>>
  >;
  <V1, V2, V3, V4, E1 = unknown, E2 = unknown, E3 = unknown, E4 = unknown>(
    values: readonly [
      AsyncResult<V1, E1>,
      AsyncResult<V2, E2>,
      AsyncResult<V3, E3>,
      AsyncResult<V4, E4>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4],
    AggregateError<
      DefaultError<E1> | DefaultError<E2> | DefaultError<E3> | DefaultError<E4>
    >
  >;
  <
    V1,
    V2,
    V3,
    V4,
    V5,
    E1 = unknown,
    E2 = unknown,
    E3 = unknown,
    E4 = unknown,
    E5 = unknown
  >(
    values: readonly [
      AsyncResult<V1, E1>,
      AsyncResult<V2, E2>,
      AsyncResult<V3, E3>,
      AsyncResult<V4, E4>,
      AsyncResult<V5, E5>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5],
    AggregateError<
      | DefaultError<E1>
      | DefaultError<E2>
      | DefaultError<E3>
      | DefaultError<E4>
      | DefaultError<E5>
    >
  >;
  <
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    E1 = unknown,
    E2 = unknown,
    E3 = unknown,
    E4 = unknown,
    E5 = unknown,
    E6 = unknown
  >(
    values: readonly [
      AsyncResult<V1, E1>,
      AsyncResult<V2, E2>,
      AsyncResult<V3, E3>,
      AsyncResult<V4, E4>,
      AsyncResult<V5, E5>,
      AsyncResult<V6, E6>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5, V6],
    AggregateError<
      | DefaultError<E1>
      | DefaultError<E2>
      | DefaultError<E3>
      | DefaultError<E4>
      | DefaultError<E5>
      | DefaultError<E6>
    >
  >;
  <T, E = unknown>(values: readonly AsyncResult<T>[]): AsyncResult<
    T[],
    AggregateError<DefaultError<E>>
  >;
};

export const join = ((results: readonly AsyncResult<unknown>[]) => {
  const pending = results.filter(AsyncResult.is.pending);
  const rejected = results.filter(AsyncResult.is.rejected);
  const resolved = results.filter(AsyncResult.is.resolved);
  if (pending.length > 0) {
    return AsyncResult.of.pending();
  }
  if (rejected.length > 0) {
    return AsyncResult.of.rejected(
      new AggregateError(rejected.map(AsyncResult.to.rejectedError) as Error[]),
    );
  }
  return AsyncResult.of.resolved(resolved.map(AsyncResult.to.resolvedValue));
}) as Join;
