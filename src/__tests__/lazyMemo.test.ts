import { lazyMemo } from "..";

test("lazyMemo", () => {
  let count = 0;
  const m = lazyMemo(() => {
    return ++count;
  });
  expect(count).toEqual(0);
  expect(m()).toEqual(1);
  expect(m()).toEqual(1);
});
