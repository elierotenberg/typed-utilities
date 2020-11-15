type LazyMemoState<T> = [resolved: false] | [resolved: true, value: T];

export const lazyMemo = <T>(fn: () => T): (() => T) => {
  let state: LazyMemoState<T> = [false];
  return () => {
    if (state[0] === false) {
      state = [true, fn()];
    }
    return state[1];
  };
};
