import { AsyncResult, range, ConcurrentError } from "..";

describe(`AsyncResult`, () => {
  test(`basic`, async () => {
    const testError = new Error(`test error`);
    const pending = AsyncResult.of.pending();
    const rejected = AsyncResult.of.rejected(testError);
    const resolved = AsyncResult.of.resolved(null);
    expect(AsyncResult.is.pending(pending)).toEqual(true);
    expect(AsyncResult.is.rejected(pending)).toEqual(false);
    expect(AsyncResult.is.resolved(pending)).toEqual(false);
    expect(() => AsyncResult.assert.pending(pending)).not.toThrow();
    expect(() => AsyncResult.assert.rejected(pending)).toThrow();
    expect(() => AsyncResult.assert.resolved(pending)).toThrow();

    expect(AsyncResult.is.pending(rejected)).toEqual(false);
    expect(AsyncResult.is.rejected(rejected)).toEqual(true);
    expect(AsyncResult.is.resolved(rejected)).toEqual(false);
    expect(() => AsyncResult.assert.pending(rejected)).toThrow();
    expect(() => AsyncResult.assert.rejected(rejected)).not.toThrow();
    expect(() => AsyncResult.assert.resolved(rejected)).toThrow();

    expect(AsyncResult.is.pending(resolved)).toEqual(false);
    expect(AsyncResult.is.rejected(resolved)).toEqual(false);
    expect(AsyncResult.is.resolved(resolved)).toEqual(true);
    expect(() => AsyncResult.assert.pending(resolved)).toThrow();
    expect(() => AsyncResult.assert.rejected(resolved)).toThrow();
    expect(() => AsyncResult.assert.resolved(resolved)).not.toThrow();

    expect(AsyncResult.to.rejectedError(rejected)).toEqual(testError);
    expect(AsyncResult.to.resolvedValue(resolved)).toEqual(null);

    const match = {
      pending: () => `pending`,
      rejected: (error: Error) => `error: ${error.message}`,
      resolved: (value: null) => `value: ${value}`,
    };

    expect(AsyncResult.match(pending, match)).toEqual(`pending`);
    expect(AsyncResult.match(rejected, match)).toEqual(`error: test error`);
    expect(AsyncResult.match(resolved, match)).toEqual(`value: null`);
  });

  test(`join`, () => {
    const error1 = new SyntaxError(`error1`);
    const error2 = new TypeError(`error2`);

    expect(AsyncResult.join([])).toEqual(AsyncResult.of.resolved([]));
    expect(AsyncResult.join([AsyncResult.of.pending()])).toEqual(
      AsyncResult.of.pending(),
    );
    expect(AsyncResult.join([AsyncResult.of.rejected(error1)])).toEqual(
      AsyncResult.of.rejected(new ConcurrentError([error1])),
    );
    expect(AsyncResult.join([AsyncResult.of.resolved(null)])).toEqual(
      AsyncResult.of.resolved([null]),
    );

    const t1 = [
      AsyncResult.of.pending(),
      AsyncResult.of.rejected(error1),
      AsyncResult.of.resolved(null),
    ] as const;
    const j1: AsyncResult.AsyncResult<[never, never, null], ConcurrentError> =
      AsyncResult.join(t1);
    expect(j1).toEqual(AsyncResult.of.pending());

    const t2 = [
      AsyncResult.of.rejected(error1),
      AsyncResult.of.resolved(null),
    ] as const;
    const j2: AsyncResult.AsyncResult<[never, null], SyntaxError> =
      AsyncResult.join(t2);
    expect(j2).toEqual(AsyncResult.of.rejected(new ConcurrentError([error1])));

    const t3 = [
      AsyncResult.of.resolved(null),
      AsyncResult.of.rejected(error1),
      AsyncResult.of.rejected(error2),
    ] as const;
    const j3: AsyncResult.AsyncResult<[null, never, never], ConcurrentError> =
      AsyncResult.join(t3);
    expect(j3).toEqual(
      AsyncResult.of.rejected(new ConcurrentError([error1, error2])),
    );

    const t4 = [
      AsyncResult.of.resolved(null),
      AsyncResult.of.resolved(0 as const),
      AsyncResult.of.resolved([`a`] as const),
    ] as const;
    const j4: AsyncResult.AsyncResult<
      [null, 0, readonly [`a`]],
      ConcurrentError
    > = AsyncResult.join(t4);
    expect(j4).toEqual(AsyncResult.of.resolved([null, 0, [`a`]]));

    const t5 = range(10).map((k) => AsyncResult.of.resolved(k));
    expect(AsyncResult.join(t5)).toEqual(AsyncResult.of.resolved(range(10)));
  });

  test(`pipe`, () => {
    expect(AsyncResult.pipe(AsyncResult.of.pending(), () => 42)).toEqual(
      AsyncResult.of.pending(),
    );
    const error1 = new Error(`error 1`);
    expect(AsyncResult.pipe(AsyncResult.of.rejected(error1), () => 42)).toEqual(
      AsyncResult.of.rejected(error1),
    );
    expect(AsyncResult.pipe(AsyncResult.of.resolved(21), (x) => 2 * x)).toEqual(
      AsyncResult.of.resolved(42),
    );
    const error2 = new Error(`error 2`);
    expect(
      AsyncResult.pipe(AsyncResult.of.resolved(21), (x) => {
        if (x === 21) {
          throw error2;
        }
        return 2 * x;
      }),
    ).toEqual(AsyncResult.of.rejected(error2));
  });
});
