import { Result, sleep, Err, Ok } from "..";

describe(`Result`, () => {
  test(`Sync`, () => {
    const divide = (a: number, b: number): number => {
      if (b === 0) {
        throw new Error(`division by zero`);
      }
      return a / b;
    };
    const res1 = Result.tryCatch(() => divide(1, 10));
    const res2 = Result.tryCatch(() => divide(1, 0));
    expect(Result.is.ok(res1)).toEqual(true);
    expect(Result.is.err(res1)).toEqual(false);
    expect(Result.to.okValue(res1 as Ok<unknown>)).toEqual(0.1);
    expect(Result.is.ok(res2)).toEqual(false);
    expect(Result.is.err(res2)).toEqual(true);
    expect(Result.to.errError(res2 as Err)).toBeInstanceOf(Error);

    const t1 = [1, 2, 3].map(Result.of.ok);
    for (const m of t1) {
      expect(Result.is.ok(m)).toEqual(true);
    }
    const isNotOdd = new Error(`not odd`);

    const keepOdd = (v: number): Result<number> =>
      v % 2 === 1 ? Result.of.ok(v) : Result.of.err(isNotOdd);

    const t2 = t1.map((r) =>
      Result.match(r, { ok: keepOdd, err: (error) => Result.of.err(error) }),
    );
    expect(t2).toEqual([
      Result.of.ok(1),
      Result.of.err(isNotOdd),
      Result.of.ok(3),
    ]);
    expect(t2.filter(Result.is.ok).map(Result.to.okValue)).toEqual([1, 3]);
  });

  test(`Async`, async () => {
    const divide = async (a: number, b: number): Promise<number> => {
      await sleep(1);
      if (b === 0) {
        throw new Error(`division by zero`);
      }
      return a / b;
    };
    const res1 = await Result.tryCatchAsync(async () => await divide(1, 10));
    const res2 = await Result.tryCatchAsync(async () => await divide(1, 0));
    expect(Result.is.ok(res1)).toEqual(true);
    expect(Result.is.err(res1)).toEqual(false);
    expect(Result.to.okValue(res1 as Ok<unknown>)).toEqual(0.1);
    expect(Result.is.ok(res2)).toEqual(false);
    expect(Result.is.err(res2)).toEqual(true);
    expect(Result.to.errError(res2 as Err)).toBeInstanceOf(Error);

    const t1 = [1, 2, 3].map(Result.of.ok);
    for (const m of t1) {
      expect(Result.is.ok(m)).toEqual(true);
    }
    const isNotOdd = new Error(`not odd`);

    const keepOdd = (v: number): Result<number> =>
      v % 2 === 1 ? Result.of.ok(v) : Result.of.err(isNotOdd);

    const t2 = t1.map((r) =>
      Result.match(r, { ok: keepOdd, err: (error) => Result.of.err(error) }),
    );
    expect(t2).toEqual([
      Result.of.ok(1),
      Result.of.err(isNotOdd),
      Result.of.ok(3),
    ]);
    expect(t2.filter(Result.is.ok).map(Result.to.okValue)).toEqual([1, 3]);
  });
});
