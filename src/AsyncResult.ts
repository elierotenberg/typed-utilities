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
  pending: (): Pending => [AsyncResultTag.Pending],
  rejected: <Error = unknown>(error: Error): Rejected<Error> => [
    AsyncResultTag.Rejected,
    error,
  ],
  resolved: <Value = unknown>(value: Value): Resolved<Value> => [
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
