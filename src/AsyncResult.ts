import { ConcurrentError } from "./ConcurrentError";

import { AsyncResult } from ".";

enum AsyncResultTag {
  Pending = `pending`,
  Resolved = `resolved`,
  Rejected = `rejected`,
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
    throw new TypeError(message ?? `asyncValue should be 'pending'`);
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
    throw new TypeError(message ?? `asyncValue should be 'rejected'`);
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
    throw new TypeError(message ?? `asyncValue should be 'resolved'`);
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
  Error = unknown,
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
  Error = unknown,
>(
  result: AsyncResult<Value, Error>,
  match: Match<IfPending, IfRejected, IfResolved, Value, Error>,
): IfPending | IfRejected | IfResolved =>
  isPending(result)
    ? match.pending()
    : isRejected(result)
    ? match.rejected(to.rejectedError(result))
    : match.resolved(to.resolvedValue(result));

type Join = {
  <V1>(values: readonly [AsyncResult<V1>]): AsyncResult<[V1], ConcurrentError>;
  <V1, V2>(values: readonly [AsyncResult<V1>, AsyncResult<V2>]): AsyncResult<
    [V1, V2],
    ConcurrentError
  >;
  <V1, V2, V3>(
    values: readonly [AsyncResult<V1>, AsyncResult<V2>, AsyncResult<V3>],
  ): AsyncResult<[V1, V2, V3], ConcurrentError>;
  <V1, V2, V3, V4>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
    ],
  ): AsyncResult<[V1, V2, V3, V4], ConcurrentError>;
  <V1, V2, V3, V4, V5>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
    ],
  ): AsyncResult<[V1, V2, V3, V4, V5], ConcurrentError>;
  <V1, V2, V3, V4, V5, V6>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
    ],
  ): AsyncResult<[V1, V2, V3, V4, V5, V6], ConcurrentError>;
  <V1, V2, V3, V4, V5, V6, V7>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
    ],
  ): AsyncResult<[V1, V2, V3, V4, V5, V6, V7], ConcurrentError>;
  <V1, V2, V3, V4, V5, V6, V7, V8>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
    ],
  ): AsyncResult<[V1, V2, V3, V4, V5, V6, V7, V8], ConcurrentError>;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
    ],
  ): AsyncResult<[V1, V2, V3, V4, V5, V6, V7, V8, V9], ConcurrentError>;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
    ],
  ): AsyncResult<[V1, V2, V3, V4, V5, V6, V7, V8, V9, V10], ConcurrentError>;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11],
    ConcurrentError
  >;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12],
    ConcurrentError
  >;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13],
    ConcurrentError
  >;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
      AsyncResult<V14>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14],
    ConcurrentError
  >;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
      AsyncResult<V14>,
      AsyncResult<V15>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15],
    ConcurrentError
  >;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
      AsyncResult<V14>,
      AsyncResult<V15>,
      AsyncResult<V16>,
    ],
  ): AsyncResult<
    [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16],
    ConcurrentError
  >;
  <V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16, V17>(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
      AsyncResult<V14>,
      AsyncResult<V15>,
      AsyncResult<V16>,
      AsyncResult<V17>,
    ],
  ): AsyncResult<
    [
      V1,
      V2,
      V3,
      V4,
      V5,
      V6,
      V7,
      V8,
      V9,
      V10,
      V11,
      V12,
      V13,
      V14,
      V15,
      V16,
      V17,
    ],
    ConcurrentError
  >;
  <
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    V7,
    V8,
    V9,
    V10,
    V11,
    V12,
    V13,
    V14,
    V15,
    V16,
    V17,
    V18,
  >(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
      AsyncResult<V14>,
      AsyncResult<V15>,
      AsyncResult<V16>,
      AsyncResult<V17>,
      AsyncResult<V18>,
    ],
  ): AsyncResult<
    [
      V1,
      V2,
      V3,
      V4,
      V5,
      V6,
      V7,
      V8,
      V9,
      V10,
      V11,
      V12,
      V13,
      V14,
      V15,
      V16,
      V17,
      V18,
    ],
    ConcurrentError
  >;
  <
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    V7,
    V8,
    V9,
    V10,
    V11,
    V12,
    V13,
    V14,
    V15,
    V16,
    V17,
    V18,
    V19,
  >(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
      AsyncResult<V14>,
      AsyncResult<V15>,
      AsyncResult<V16>,
      AsyncResult<V17>,
      AsyncResult<V18>,
      AsyncResult<V19>,
    ],
  ): AsyncResult<
    [
      V1,
      V2,
      V3,
      V4,
      V5,
      V6,
      V7,
      V8,
      V9,
      V10,
      V11,
      V12,
      V13,
      V14,
      V15,
      V16,
      V17,
      V18,
      V19,
    ],
    ConcurrentError
  >;
  <
    V1,
    V2,
    V3,
    V4,
    V5,
    V6,
    V7,
    V8,
    V9,
    V10,
    V11,
    V12,
    V13,
    V14,
    V15,
    V16,
    V17,
    V18,
    V19,
    V20,
  >(
    values: readonly [
      AsyncResult<V1>,
      AsyncResult<V2>,
      AsyncResult<V3>,
      AsyncResult<V4>,
      AsyncResult<V5>,
      AsyncResult<V6>,
      AsyncResult<V7>,
      AsyncResult<V8>,
      AsyncResult<V9>,
      AsyncResult<V10>,
      AsyncResult<V11>,
      AsyncResult<V12>,
      AsyncResult<V13>,
      AsyncResult<V14>,
      AsyncResult<V15>,
      AsyncResult<V16>,
      AsyncResult<V17>,
      AsyncResult<V18>,
      AsyncResult<V19>,
      AsyncResult<V20>,
    ],
  ): AsyncResult<
    [
      V1,
      V2,
      V3,
      V4,
      V5,
      V6,
      V7,
      V8,
      V9,
      V10,
      V11,
      V12,
      V13,
      V14,
      V15,
      V16,
      V17,
      V18,
      V19,
      V20,
    ],
    ConcurrentError
  >;
  <V>(values: readonly AsyncResult<V>[]): AsyncResult<V[], ConcurrentError>;
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
      new ConcurrentError(
        rejected.map(AsyncResult.to.rejectedError) as Error[],
      ),
    );
  }
  return AsyncResult.of.resolved(resolved.map(AsyncResult.to.resolvedValue));
}) as Join;

export const pipe = <T, U>(
  result: AsyncResult<T>,
  fn: (value: T) => U,
): AsyncResult<U> =>
  AsyncResult.match(result, {
    pending: AsyncResult.of.pending,
    rejected: AsyncResult.of.rejected,
    resolved: (value) => {
      try {
        return AsyncResult.of.resolved(fn(value));
      } catch (error) {
        return AsyncResult.of.rejected(error);
      }
    },
  });
