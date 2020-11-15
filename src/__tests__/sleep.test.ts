import { sleep } from "../sleep";

test("sleep", async () => {
  const start = Date.now();
  await sleep(100);
  const end = Date.now();
  const duration = end - start;
  expect(duration).toBeGreaterThanOrEqual(100);
  expect(duration).toBeLessThan(200);
});
