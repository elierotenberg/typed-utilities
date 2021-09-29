import { Either } from "..";

test(`Either`, () => {
  expect(Either.is.left(Either.of.left(1))).toEqual(true);
  expect(Either.is.right(Either.of.left(1))).toEqual(false);
  expect(() => Either.assert.left(Either.of.left(1))).not.toThrow();
  expect(() => Either.assert.right(Either.of.left(1))).toThrow();
  expect(Either.to.leftValue(Either.of.left(1))).toEqual(1);

  expect(Either.is.left(Either.of.right(`1`))).toEqual(false);
  expect(Either.is.right(Either.of.right(`1`))).toEqual(true);
  expect(() => Either.assert.left(Either.of.right(`1`))).toThrow();
  expect(() => Either.assert.right(Either.of.right(`1`))).not.toThrow();
  expect(Either.to.rightValue(Either.of.right(`1`))).toEqual(`1`);

  const t1 = [1, 2, 3].map(Either.of.left);
  for (const m of t1) {
    expect(Either.is.left(m));
    expect(() => Either.assert.left(m)).not.toThrow();
    expect(() => Either.assert.right(m)).toThrow();
  }

  const keepOdd = (v: number): Either<number, string> =>
    v % 2 === 1 ? Either.of.left(v) : Either.of.right(`not odd`);

  const t2 = t1.map((m) =>
    Either.match(m, { left: keepOdd, right: Either.of.right }),
  );
  expect(t2).toEqual([
    Either.of.left(1),
    Either.of.right(`not odd`),
    Either.of.left(3),
  ]);
  expect(t2.filter(Either.is.left).map(Either.to.leftValue)).toEqual([1, 3]);
});
