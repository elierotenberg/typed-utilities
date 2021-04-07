import {
  AggregateError,
  mapAsyncConcurrent,
  mapAsyncSerial,
  sleep,
  resolveAllConcurrent,
  resolveAllSerial,
} from "..";

describe("MapAsync", () => {
  test("mapAsyncSerial", async () => {
    const log: number[] = [];
    const fn = async (value: number): Promise<number> => {
      await sleep(value);
      log.push(value);
      return value;
    };
    expect(await mapAsyncSerial([300, 100, 200], fn)).toEqual([300, 100, 200]);
    expect(log).toEqual([300, 100, 200]);
  });

  test("mapAsyncConcurrent without rejections", async () => {
    const log: number[] = [];
    const fn = async (value: number): Promise<number> => {
      await sleep(value);
      log.push(value);
      return value;
    };
    expect(await mapAsyncConcurrent([300, 100, 200], fn)).toEqual([
      300,
      100,
      200,
    ]);
    expect(log).toEqual([100, 200, 300]);
  });

  test("mapAsyncConcurrent with rejections", async () => {
    let countTrue = 0;
    const fn = async ([b, delayMs]: readonly [
      b: boolean,
      delayMs: number,
    ]): Promise<void> => {
      await sleep(delayMs);
      if (b) {
        countTrue++;
      } else {
        throw new Error();
      }
    };
    const t = [
      [true, 10],
      [true, 30],
      [false, 20],
      [true, 50],
      [false, 100],
    ] as const;
    await expect(() => Promise.all(t.map(fn))).rejects.toBeTruthy();
    expect(countTrue).toEqual(1);
    await sleep(200);
    expect(countTrue).toEqual(3);
    countTrue = 0;
    await expect(() => mapAsyncConcurrent(t, fn)).rejects.toBeTruthy();
    expect(countTrue).toEqual(3);
    await expect(() => mapAsyncConcurrent(t, fn)).rejects.toBeInstanceOf(
      AggregateError,
    );
    expect(countTrue).toEqual(6);
  });

  test("resolveAllSerial, resolveAllConcurrent with identity (Promise.all-like)", async () => {
    const items = [
      Promise.resolve(1),
      Promise.resolve(null),
      Promise.resolve(3),
    ] as const;
    expect(await resolveAllSerial(items)).toEqual([1, null, 3]);
    expect(await resolveAllConcurrent(items)).toEqual([1, null, 3]);
  });
});
