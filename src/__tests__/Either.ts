import { Either } from "..";

test("Either", () => {
  expect(Either.isLeft(Either.of.left(1))).toEqual(true);
  expect(Either.isRight(Either.of.left(1))).toEqual(false);
  expect(Either.isLeft(Either.of.right("1"))).toEqual(false);
  expect(Either.isRight(Either.of.right("1"))).toEqual(true);
  expect(Either.leftOf(Either.of.left(1))).toEqual(1);

  const t1 = [1, 2, 3].map(Either.of.left);
  for (const m of t1) {
    expect(Either.isLeft(m));
  }

  const keepOdd = (v: number): Either.Either<number, string> =>
    v % 2 === 1 ? Either.of.left(v) : Either.of.right("not odd");

  const t2 = t1.map((m) =>
    Either.match(m, { left: keepOdd, right: Either.of.right }),
  );
  expect(t2).toEqual([
    Either.of.left(1),
    Either.of.right("not odd"),
    Either.of.left(3),
  ]);
  expect(t2.filter(Either.isLeft).map(Either.leftOf)).toEqual([1, 3]);
});
