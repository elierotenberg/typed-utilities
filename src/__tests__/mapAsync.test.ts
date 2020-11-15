import { mapAsyncConcurrent, mapAsyncSerial, sleep } from "..";

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
  test("mapAsyncConcurrent", async () => {
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
});
