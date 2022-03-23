import { mapAsyncConcurrent, sleep, tap, tapAsync } from "..";

test(`tap`, () => {
  const t1 = [1, 2, 3];
  let sum = 0;
  const t2 = t1.map(
    tap((value) => {
      sum += value;
    }),
  );
  expect(t2).toEqual(t1);
  expect(sum).toEqual(6);
});

test(`tapAsync`, async () => {
  const t1 = [1, 2, 3];
  let sum = 0;

  const t2 = await mapAsyncConcurrent(
    t1,
    tapAsync(async (value) => {
      await sleep(0);
      sum += value;
    }),
  );
  expect(t2).toEqual(t1);
  expect(sum).toEqual(6);
});
