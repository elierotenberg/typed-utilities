import { isNone, isSome, map, Maybe, none, some, valueOf, valuesOf } from "..";

test("Maybe", () => {
  expect(isSome(some(1))).toEqual(true);
  expect(isNone(some(1))).toEqual(false);
  expect(isSome(none())).toEqual(false);
  expect(isNone(none())).toEqual(true);
  expect(valueOf(some(1))).toEqual(1);

  const t1 = [1, 2, 3].map(some);
  for (const m of t1) {
    expect(isSome(m));
  }

  const keepOdd = (v: number): Maybe<number> =>
    v % 2 === 1 ? some(v) : none();

  const t2 = t1.map((m) => map(m, keepOdd));
  expect(t2).toEqual([some(1), none(), some(3)]);
  expect(valuesOf(t2)).toEqual([1, 3]);
});
