enum AsyncResultTag {
  Pending = "pending",
  Resolved = "resolved",
  Rejected = "rejected",
}

export type Pending = [tag: AsyncResultTag.Pending];
export type Rejected = [tag: AsyncResultTag.Rejected, error: Error];
export type Resolved<T> = [tag: AsyncResultTag.Resolved, value: T];
export type AsyncResult<T> = Pending | Rejected | Resolved<T>;

function isPending(result: AsyncResult<unknown>): result is Pending {
  return result[0] === AsyncResultTag.Pending;
}

function assertPending(
  result: AsyncResult<unknown>,
  message?: string,
): asserts result is Pending {
  if (!isPending(result)) {
    throw new TypeError(message ?? "asyncValue should be 'pending'");
  }
}

function isRejected(result: AsyncResult<unknown>): result is Rejected {
  return result[0] === AsyncResultTag.Rejected;
}

function assertRejected(
  result: AsyncResult<unknown>,
  message?: string,
): asserts result is Rejected {
  if (!isRejected(result)) {
    throw new TypeError(message ?? "asyncValue should be 'rejected'");
  }
}

function isResolved<T>(result: AsyncResult<T>): result is Resolved<T> {
  return result[0] === AsyncResultTag.Resolved;
}

function assertResolved<T>(
  result: AsyncResult<T>,
  message?: string,
): asserts result is Resolved<T> {
  if (!isResolved(result)) {
    throw new TypeError(message ?? "asyncValue should be 'resolved'");
  }
}

const resolvedValue = <T>(resolved: Resolved<T>): T => resolved[1];
const rejectedError = (rejected: Rejected): Error => rejected[1];

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
  rejected: (error: Error): Rejected => [AsyncResultTag.Rejected, error],
  resolved: <T>(value: T): Resolved<T> => [AsyncResultTag.Resolved, value],
};

export const to = {
  resolvedValue,
  rejectedError,
};

type Match<T, IfPending, IfRejected, IfResolved> = {
  readonly pending: () => IfPending;
  readonly rejected: (error: Error) => IfRejected;
  readonly resolved: (value: T) => IfResolved;
};

export const match = <T, IfPending, IfRejected, IfResolved>(
  result: AsyncResult<T>,
  match: Match<T, IfPending, IfRejected, IfResolved>,
): IfPending | IfRejected | IfResolved =>
  isPending(result)
    ? match.pending()
    : isRejected(result)
    ? match.rejected(to.rejectedError(result))
    : match.resolved(to.resolvedValue(result));
