import { Maybe } from "..";

test("Maybe", () => {
  expect(Maybe.isSome(Maybe.some(1))).toEqual(true);
  expect(Maybe.isNone(Maybe.some(1))).toEqual(false);
  expect(Maybe.isSome(Maybe.none())).toEqual(false);
  expect(Maybe.isNone(Maybe.none())).toEqual(true);
  expect(Maybe.valueOf(Maybe.some(1))).toEqual(1);

  const t1 = [1, 2, 3].map(Maybe.some);
  for (const m of t1) {
    expect(Maybe.isSome(m));
  }

  const keepOdd = (v: number): Maybe.Maybe<number> =>
    v % 2 === 1 ? Maybe.some(v) : Maybe.none();

  const t2 = t1.map((m) => Maybe.map(m, keepOdd));
  expect(t2).toEqual([Maybe.some(1), Maybe.none(), Maybe.some(3)]);
  expect(Maybe.valuesOf(t2)).toEqual([1, 3]);
});
