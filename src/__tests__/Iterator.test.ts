import * as Iterator from "../Iterator";

describe("Iterator", () => {
  test("next", () => {
    function* gen(): Iterator<number> {
      yield 1;
      yield 2;
      yield 3;
    }
    const iter = gen();
    expect(Iterator.next(iter)).toEqual(1);
    expect(Iterator.next(iter)).toEqual(2);
    expect(Iterator.next(iter)).toEqual(3);
    expect(() => Iterator.next(iter)).toThrow();
  });

  test("nextify", () => {
    function* gen(): Iterator<number> {
      yield 1;
      yield 2;
      yield 3;
    }
    const iter = gen();
    const next = Iterator.nextify(iter);
    expect(next()).toEqual(1);
    expect(next()).toEqual(2);
    expect(next()).toEqual(3);
    expect(next).toThrow();
  });

  test("runToCompletion", async () => {
    function* gen1(): Iterator<number> {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    }
    const gen1Result = await Iterator.runToCompletion(gen1());
    expect(gen1Result).toEqual(4);

    function* gen2(): Iterator<number> {
      yield 1;
      yield 2;
      throw new Error();
    }
    await expect(
      async () => await Iterator.runToCompletion(gen2()),
    ).rejects.toBeTruthy();
  });

  test("withRunToCompletion", async () => {
    const fn = Iterator.withRunToCompletion(function* () {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    });
    const result = await fn();
    expect(result).toEqual(4);
  });

  test(
    "unnested withRunToCompletion",
    Iterator.withRunToCompletion(function* () {
      yield 3;
      yield 4;
      yield expect(5).toEqual(5);
    }),
  );
});
