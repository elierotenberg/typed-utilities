import { AsyncResult } from ".";

export type Deferred<T> = {
  readonly state: () => AsyncResult.AsyncResult<T>;
  readonly resolve: (value: T) => void;
  readonly reject: (error: Error) => void;
  readonly await: () => Promise<T>;
};

export const defer = <T>(): Deferred<T> => {
  let state: AsyncResult.AsyncResult<T> = AsyncResult.of.pending();
  let innerResolve: null | ((value: T) => void) = null;
  let innerReject: null | ((error: Error) => void) = null;
  const promise = new Promise<T>((resolve, reject) => {
    innerResolve = resolve;
    innerReject = reject;
  });

  const resolve: Deferred<T>[`resolve`] = (value) => {
    if (!AsyncResult.is.pending(state)) {
      throw new Error(`Deferred already settled`);
    }
    if (!innerResolve) {
      throw new Error(`innerResolve is not defined`);
    }
    state = AsyncResult.of.resolved(value);
    innerResolve(value);
  };

  const reject: Deferred<T>[`reject`] = (error) => {
    if (!AsyncResult.is.pending(state)) {
      throw new Error(`Deferred already settled`);
    }
    if (!innerReject) {
      throw new Error(`innerResolve is not defined`);
    }
    state = AsyncResult.of.rejected(error);
    innerReject(error);
  };

  return {
    state: () => state,
    reject,
    resolve,
    await: () => promise,
  };
};
