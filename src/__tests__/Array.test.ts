import deepEqual from "fast-deep-equal";

import {
  containEqualItems,
  deduplicate,
  intersection,
  exactlyNone,
  exactlyOne,
  exactlyOneOrNone,
} from "..";

describe(`Array`, () => {
  describe(`containEqualItems`, () => {
    test(`numbers`, () => {
      const t1 = [1, 2, 3];
      const t2 = [2, 3, 1];
      const t3 = [1, 2, 4, 3];
      expect(containEqualItems(t1, t2)).toEqual(true);
      expect(containEqualItems(t1, t3)).toEqual(false);
      expect(containEqualItems(t3, t1)).toEqual(false);
      const equalMod4 = (a: number, b: number): boolean => a % 4 === b % 4;
      expect(containEqualItems(t1, t2, equalMod4)).toEqual(true);
      expect(containEqualItems(t1, t2, equalMod4)).toEqual(true);
      expect(containEqualItems(t1, t3, equalMod4)).toEqual(false);
    });

    test(`objects`, () => {
      const t1 = [{ key1: `value1` }, { key2: `value2` }];
      const t2 = [{ key2: `value2` }, { key1: `value1` }];
      const t3 = [{ key1: `value3` }, { key2: `value4` }];
      expect(containEqualItems(t1, t2)).toEqual(false);
      expect(containEqualItems(t1, t2, deepEqual)).toEqual(true);
      expect(containEqualItems(t1, t3, deepEqual)).toEqual(false);
      expect(containEqualItems(t3, t1, deepEqual)).toEqual(false);

      type Q = {
        readonly p: number;
        readonly q: number;
      };
      const t4 = [
        { p: 1, q: 2 },
        { p: 1, q: 3 },
      ];
      const t5 = [
        { p: 6, q: 18 },
        { p: 100, q: 200 },
      ];
      const t6 = [
        { p: 6, q: 200 },
        { p: 100, q: 18 },
      ];

      const equalRatio = (a: Q, b: Q): boolean => a.p * b.q === a.q * b.p;

      expect(containEqualItems(t4, t5, equalRatio)).toEqual(true);
      expect(containEqualItems(t4, t6, equalRatio)).toEqual(false);
      expect(containEqualItems(t5, t6, equalRatio)).toEqual(false);
    });
  });

  describe(`deduplicate`, () => {
    test(`numbers`, () => {
      const t = [1, 3, 1, 1, 3, 2];
      expect(deduplicate(t)).toEqual([1, 3, 2]);
      expect(deduplicate(t, (a, b) => a % 2 === b % 2)).toEqual([1, 2]);
    });

    test(`objects`, () => {
      const t1 = [
        { key1: `value1` },
        { key1: `value2` },
        { key2: `value1` },
        { key1: `value1` },
        { key2: `value2` },
        { key1: `value1` },
      ];
      expect(deduplicate(t1)).toEqual(t1);
      expect(deduplicate(t1, deepEqual)).toEqual([
        { key1: `value1` },
        { key1: `value2` },
        { key2: `value1` },
        { key2: `value2` },
      ]);
      const t2 = [{ v: 0 }, { v: 1 }, { v: 0 }, { v: 1 }];
      expect(deduplicate(t2)).toEqual(t2);
      expect(deduplicate(t2, deepEqual)).toEqual([{ v: 0 }, { v: 1 }]);
      expect(deduplicate(t2, (a, b) => a.v === b.v)).toEqual([
        { v: 0 },
        { v: 1 },
      ]);
      const t3 = [
        { p: 1, q: 2 },
        { p: 0.5, q: 1 },
        { p: 2, q: 1 },
        { p: 2, q: 4 },
        { p: 12, q: 6 },
      ];
      expect(deduplicate(t3)).toEqual(t3);
      expect(deduplicate(t3, deepEqual)).toEqual(t3);
      expect(deduplicate(t3, (a, b) => a.p * b.q === a.q * b.p)).toEqual([
        { p: 1, q: 2 },
        { p: 2, q: 1 },
      ]);
      expect(deduplicate(t3, (a, b) => a.q === b.q || a.p === b.p)).toEqual([
        { p: 1, q: 2 },
        { p: 0.5, q: 1 },
        { p: 2, q: 4 },
        { p: 12, q: 6 },
      ]);
    });
  });

  describe(`intersection`, () => {
    test(`numbers`, () => {
      const t1 = [1, 3, 1, 2, 1];
      const t2 = [2, 1, 1, 1, 2];
      const t3 = [2];
      expect(intersection([t1, t2])).toEqual([2, 1]);
      expect(intersection([t1, t3])).toEqual([2]);
      expect(intersection([t1, t2, t3])).toEqual([2]);
    });

    test(`objects`, () => {
      const t1 = [{ v: 1 }, { v: 3 }, { v: 1 }, { v: 2 }, { v: 1 }, { u: 3 }];
      const t2 = [{ v: 2 }, { v: 1 }, { v: 1 }, { v: 1 }, { u: 3 }];
      const t3 = [{ v: 2 }, { u: 4 }];
      expect(intersection([t1, t2])).toEqual([]);
      expect(intersection([t1, t2], deepEqual)).toEqual([
        { v: 2 },
        { v: 1 },
        { u: 3 },
      ]);
      expect(intersection([t1, t3], deepEqual)).toEqual([{ v: 2 }]);
      expect(intersection([t1, t2, t3], deepEqual)).toEqual([{ v: 2 }]);
    });

    test(`exactlyNone`, () => {
      expect(exactlyNone([])).toEqual(null);
      expect(() => exactlyNone([1])).toThrow();
      expect(() => exactlyNone([1, 2])).toThrow();
    });

    test(`exactlyOne`, () => {
      expect(() => exactlyOne([])).toThrow();
      expect(exactlyOne([1])).toEqual(1);
      expect(() => exactlyOne([1, 2])).toThrow();
    });

    test(`exactlyOneOrNone`, () => {
      expect(exactlyOneOrNone([])).toEqual(null);
      expect(exactlyOneOrNone([1])).toEqual(1);
      expect(() => exactlyOneOrNone([1, 2])).toThrow();
    });
  });
});
