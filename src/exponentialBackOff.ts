import { sleep } from "./sleep";

export const exponentialBackOffDelay = (
  baseInterval: number,
  factor: number,
  iteration: number,
): number =>
  iteration === 0
    ? 0
    : Math.random() * Math.pow(factor, iteration + 1) * baseInterval;

export const exponentialBackOff = async <T>(
  baseInterval: number,
  factor: number,
  deadline: number,
  fn: (iteration: number, now: number) => Promise<null | T>,
): Promise<null | T> => {
  for (let iteration = 0; true; iteration++) {
    const nextDelay = exponentialBackOffDelay(baseInterval, factor, iteration);
    if (Date.now() + nextDelay > deadline) {
      return null;
    }
    await sleep(nextDelay);
    const now = Date.now();
    const value = await fn(iteration, now);
    if (value !== null) {
      return value;
    }
  }
};
