export const next = <T>(iter: Iterator<T>): T => {
  const { value, done } = iter.next();
  if (done) {
    throw new Error(`Iterable is done`);
  }
  return value;
};

export const nextify =
  <T>(iter: Iterator<T>): (() => T) =>
  () =>
    next(iter);

export const runToCompletion = <T>(iter: Iterator<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    while (true) {
      try {
        const next = iter.next();
        if (next.done) {
          resolve(next.value);
          return;
        }
      } catch (error) {
        reject(error);
      }
    }
  });

export const withRunToCompletion =
  <T>(fn: () => Iterator<T>): (() => Promise<T>) =>
  async () =>
    await runToCompletion(fn());
