import { performance } from "perf_hooks";

import { sleep } from "..";

test(`sleep`, async () => {
  const start = performance.now();
  await sleep(100);
  const end = performance.now();
  const duration = end - start;
  expect(duration).toBeGreaterThanOrEqual(90);
  expect(duration).toBeLessThan(200);
});
