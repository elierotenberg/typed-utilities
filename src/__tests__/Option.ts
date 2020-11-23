import { Option } from "..";

test("Option", () => {
  expect(Option.isSome(Option.of.some(1))).toEqual(true);
  expect(Option.isNone(Option.of.some(1))).toEqual(false);
  expect(Option.isSome(Option.of.none())).toEqual(false);
  expect(Option.isNone(Option.of.none())).toEqual(true);
  expect(Option.valueOf(Option.of.some(1))).toEqual(1);

  const t1 = [1, 2, 3].map(Option.of.some);
  for (const m of t1) {
    expect(Option.isSome(m));
  }

  const keepOdd = (v: number): Option.Maybe<number> =>
    v % 2 === 1 ? Option.of.some(v) : Option.of.none();

  const t2 = t1.map((m) =>
    Option.match(m, { some: keepOdd, none: Option.of.none }),
  );
  expect(t2).toEqual([Option.of.some(1), Option.of.none(), Option.of.some(3)]);
  expect(t2.filter(Option.isSome).map(Option.valueOf)).toEqual([1, 3]);
});
