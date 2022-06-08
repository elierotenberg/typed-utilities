import { AsyncSemaphore, mapAsyncConcurrent, range, sleep } from "..";

describe(`AsyncSemaphore`, () => {
  test(`use AsyncSemaphore`, async () => {
    const semaphore = new AsyncSemaphore(10);

    let max = 0;
    let success = 0;

    await mapAsyncConcurrent(range(100), async (k) => {
      await semaphore.use(async () => {
        max = Math.max(max, semaphore.current);
        await sleep(10);
        if (k % 2 === 0) {
          throw new Error();
        } else {
          success++;
        }
      });
    }).catch(() => void 0);

    expect(semaphore.current).toEqual(0);
    expect(max).toEqual(10);
    expect(success).toEqual(50);
  });
});
