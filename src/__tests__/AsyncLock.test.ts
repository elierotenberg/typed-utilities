import { AsyncLock, mapAsyncConcurrent, range, sleep } from "..";

describe(`AsyncLock`, () => {
  test(`use AsyncLock`, async () => {
    const lock = new AsyncLock();
    expect(lock.length).toEqual(0);
    await lock.use(async () => {
      expect(lock.length).toEqual(1);
    });
    expect(lock.length).toEqual(0);
    let acquired: null | number = null;
    const results: number[] = [];
    const errors: number[] = [];
    const join = mapAsyncConcurrent(range(100), (key) =>
      lock
        .use(async () => {
          expect(acquired).toEqual(null);
          acquired = key;
          await sleep(0);
          expect(acquired).toEqual(key);
          acquired = null;
          if (key % 2 === 0) {
            return key;
          }
          throw new Error();
        })
        .then((result) => {
          results.push(result);
        })
        .catch((error) => {
          errors.push(error);
        }),
    );
    expect(lock.length).toEqual(100);
    await join;
    expect(lock.length).toEqual(0);
    expect(results).toEqual(range(100).filter((key) => key % 2 === 0));
    expect(errors).toHaveLength(50);
  });
});
