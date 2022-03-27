import { memoize, weakMemoize } from "../Memo";

describe(`Memo`, () => {
  describe(`memoize`, () => {
    test(`primtive`, () => {
      let count = 0;
      const fn = (x: number): number => {
        count++;
        return x * x;
      };

      expect(fn(0)).toEqual(0);
      expect(count).toEqual(1);
      expect(fn(3)).toEqual(9);
      expect(count).toEqual(2);

      count = 0;

      const [fnMemo, map] = memoize(fn);

      expect(map.has(0)).toEqual(false);
      expect(fnMemo(0)).toEqual(0);
      expect(map.get(0)).toEqual(0);
      expect(count).toEqual(1);
      expect(fnMemo(0)).toEqual(0);
      expect(count).toEqual(1);

      count = 0;

      expect(map.has(3)).toEqual(false);
      expect(fnMemo(3)).toEqual(9);
      expect(map.get(3)).toEqual(9);
      expect(count).toEqual(1);
      expect(fnMemo(3)).toEqual(9);
      expect(count).toEqual(1);
    });

    test(`object`, () => {
      let count = 0;
      const t1 = [1, 2, 3];
      const t2 = [10, 20, 30];
      const t3 = [1, 2, 3];
      const fn = (t: number[]): number => {
        count++;
        return t.reduce<number>((a, b) => a + b, 0);
      };

      expect(fn(t1)).toEqual(6);
      expect(count).toEqual(1);
      expect(fn(t2)).toEqual(60);
      expect(count).toEqual(2);
      expect(fn(t3)).toEqual(6);
      expect(count).toEqual(3);
      expect(fn(t3)).toEqual(6);
      expect(count).toEqual(4);

      count = 0;

      const [fnMemo, map] = memoize(fn);

      expect(map.has(t1)).toEqual(false);
      expect(fnMemo(t1)).toEqual(6);
      expect(count).toEqual(1);
      expect(map.has(t1)).toEqual(true);
      expect(map.get(t1)).toEqual(6);

      expect(map.has(t1)).toEqual(true);
      expect(fnMemo(t1)).toEqual(6);
      expect(count).toEqual(1);

      count = 0;

      expect(map.has(t3)).toEqual(false);
      expect(fnMemo(t3)).toEqual(6);
      expect(fnMemo(t3)).toEqual(6);
      expect(fnMemo(t3)).toEqual(6);
      expect(fnMemo(t3)).toEqual(6);
      expect(count).toEqual(1);
      expect(!map.has(t1));
      expect(map.has(t3));
      expect(map.get(t3)).toEqual(6);
    });
  });

  describe(`weakMemoize`, () => {
    test(`object`, () => {
      let count = 0;
      const t1 = [1, 2, 3];
      const t2 = [10, 20, 30];
      const t3 = [1, 2, 3];
      const fn = (t: number[]): number => {
        count++;
        return t.reduce<number>((a, b) => a + b, 0);
      };

      expect(fn(t1)).toEqual(6);
      expect(count).toEqual(1);
      expect(fn(t2)).toEqual(60);
      expect(count).toEqual(2);
      expect(fn(t3)).toEqual(6);
      expect(count).toEqual(3);
      expect(fn(t3)).toEqual(6);
      expect(count).toEqual(4);

      count = 0;

      const [fnMemo, map] = weakMemoize(fn);

      expect(map.has(t1)).toEqual(false);
      expect(fnMemo(t1)).toEqual(6);
      expect(count).toEqual(1);
      expect(map.has(t1)).toEqual(true);
      expect(map.get(t1)).toEqual(6);

      expect(map.has(t1)).toEqual(true);
      expect(fnMemo(t1)).toEqual(6);
      expect(count).toEqual(1);

      count = 0;

      expect(map.has(t3)).toEqual(false);
      expect(fnMemo(t3)).toEqual(6);
      expect(fnMemo(t3)).toEqual(6);
      expect(fnMemo(t3)).toEqual(6);
      expect(fnMemo(t3)).toEqual(6);
      expect(count).toEqual(1);
      expect(!map.has(t1));
      expect(map.has(t3));
      expect(map.get(t3)).toEqual(6);
    });
  });
});
