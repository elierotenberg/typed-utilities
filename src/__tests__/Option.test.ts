import { Option } from "..";

test("Option", () => {
  expect(Option.is.some(Option.of.some(1))).toEqual(true);
  expect(Option.is.none(Option.of.some(1))).toEqual(false);
  expect(() => Option.assert.some(Option.of.some(1))).not.toThrow();
  expect(() => Option.assert.none(Option.of.some(1))).toThrow();
  expect(Option.is.some(Option.of.none())).toEqual(false);
  expect(Option.is.none(Option.of.none())).toEqual(true);
  expect(() => Option.assert.some(Option.of.none())).toThrow();
  expect(() => Option.assert.none(Option.of.none())).not.toThrow();
  expect(Option.to.someValue(Option.of.some(1))).toEqual(1);

  const t1 = [1, 2, 3].map(Option.of.some);
  for (const m of t1) {
    expect(Option.is.some(m));
  }

  const keepOdd = (v: number): Option.Option<number> =>
    v % 2 === 1 ? Option.of.some(v) : Option.of.none();

  const t2 = t1.map((m) =>
    Option.match(m, { some: keepOdd, none: Option.of.none }),
  );
  expect(t2).toEqual([Option.of.some(1), Option.of.none(), Option.of.some(3)]);
  expect(t2.filter(Option.is.some).map(Option.to.someValue)).toEqual([1, 3]);
});
