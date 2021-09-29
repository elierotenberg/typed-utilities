import { next, nextify, runToCompletion, withRunToCompletion } from "..";

describe(`Iterator`, () => {
  test(`next`, () => {
    function* gen(): Iterator<number> {
      yield 1;
      yield 2;
      yield 3;
    }
    const iter = gen();
    expect(next(iter)).toEqual(1);
    expect(next(iter)).toEqual(2);
    expect(next(iter)).toEqual(3);
    expect(() => next(iter)).toThrow();
  });

  test(`nextify`, () => {
    function* gen(): Iterator<number> {
      yield 1;
      yield 2;
      yield 3;
    }
    const iter = gen();
    const next = nextify(iter);
    expect(next()).toEqual(1);
    expect(next()).toEqual(2);
    expect(next()).toEqual(3);
    expect(next).toThrow();
  });

  test(`runToCompletion`, async () => {
    function* gen1(): Iterator<number> {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    }
    const gen1Result = await runToCompletion(gen1());
    expect(gen1Result).toEqual(4);

    function* gen2(): Iterator<number> {
      yield 1;
      yield 2;
      throw new Error();
    }
    await expect(
      async () => await runToCompletion(gen2()),
    ).rejects.toBeTruthy();
  });

  test(`withRunToCompletion`, async () => {
    const fn = withRunToCompletion(function* () {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    });
    const result = await fn();
    expect(result).toEqual(4);
  });

  test(
    `unnested withRunToCompletion`,
    withRunToCompletion(function* () {
      yield 3;
      yield 4;
      yield expect(5).toEqual(5);
    }),
  );
});
