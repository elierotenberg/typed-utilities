import { useAsync } from "../useAsync";

test("useAsync", async () => {
  const counters: Set<Counter> = new Set();
  class Counter {
    private state = 0;
    public constructor(readonly name: string) {
      this.state = 0;
      counters.add(this);
    }

    public readonly incr = async (): Promise<void> => {
      this.state++;
    };

    public readonly error = async (): Promise<never> => {
      throw new Error();
    };

    public readonly destroy = async (): Promise<void> => {
      counters.delete(this);
    };

    public readonly value = (): number => this.state;
  }

  const stack: number[] = [];

  expect(counters.size).toEqual(0);
  const unused = new Counter("unused");
  expect(counters.size).toEqual(1);
  await unused.destroy();
  expect(counters.size).toEqual(0);

  const counterValue = await useAsync(
    async () => {
      return new Counter("counter 1");
    },
    async (counter) => {
      await counter.destroy();
    },
    async (counter) => {
      expect(counters.size).toEqual(1);
      stack.push(counter.value());
      await counter.incr();
      stack.push(counter.value());
      await counter.incr();
      stack.push(counter.value());
      await counter.incr();
      stack.push(counter.value());
      return counter.value();
    },
  );

  expect(counters.size).toEqual(0);
  expect(counterValue).toEqual(3);
  expect(stack).toEqual([0, 1, 2, 3]);

  stack.splice(0, stack.length);
  expect(stack).toEqual([]);

  await expect(
    async () =>
      await useAsync(
        async () => new Counter("counter 2"),
        async (counter) => await counter.destroy(),
        async (counter) => {
          expect(counters.size).toEqual(1);
          stack.push(counter.value());
          await counter.incr();
          stack.push(counter.value());
          await counter.incr();
          stack.push(counter.value());
          await counter.incr();
          stack.push(counter.value());
          await counter.error();
        },
      ),
  ).rejects.toBeTruthy();

  expect(counters.size).toEqual(0);
  expect(stack).toEqual([0, 1, 2, 3]);
});
