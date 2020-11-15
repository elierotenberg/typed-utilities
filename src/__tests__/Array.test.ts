import deepEqual from "fast-deep-equal";

import { containEqualItems, deduplicate, intersection } from "..";

describe("Array", () => {
  describe("containEqualItems", () => {
    test("numbers", () => {
      const a = [1, 2, 3];
      const b = [2, 3, 1];
      const c = [1, 2, 4, 3];
      expect(containEqualItems(a, b)).toEqual(true);
      expect(containEqualItems(a, c)).toEqual(false);
      expect(containEqualItems(c, a)).toEqual(false);
    });

    test("objects", () => {
      const a = [{ key1: "value1" }, { key2: "value2" }];
      const b = [{ key2: "value2" }, { key1: "value1" }];
      const c = [{ key1: "value3" }, { key2: "value4" }];
      expect(containEqualItems(a, b)).toEqual(false);
      expect(containEqualItems(a, b, deepEqual)).toEqual(true);
      expect(containEqualItems(a, c, deepEqual)).toEqual(false);
      expect(containEqualItems(c, a, deepEqual)).toEqual(false);
    });
  });

  describe("deduplicate", () => {
    test("numbers", () => {
      const t = [1, 3, 1, 1, 3, 2];
      expect(deduplicate(t)).toEqual([1, 3, 2]);
    });

    test("objects", () => {
      const t = [
        { key1: "value1" },
        { key1: "value2" },
        { key2: "value1" },
        { key1: "value1" },
        { key2: "value2" },
        { key1: "value1" },
      ];
      expect(deduplicate(t)).toEqual(t);
      expect(deduplicate(t, deepEqual)).toEqual([
        { key1: "value1" },
        { key1: "value2" },
        { key2: "value1" },
        { key2: "value2" },
      ]);
    });
  });

  describe("intersection", () => {
    test("numbers", () => {
      const a = [1, 3, 1, 2, 1];
      const b = [2, 1, 1, 1, 2];
      const c = [2];
      expect(intersection([a, b])).toEqual([2, 1]);
      expect(intersection([a, c])).toEqual([2]);
      expect(intersection([a, b, c])).toEqual([2]);
    });

    test("objects", () => {
      const a = [{ v: 1 }, { v: 3 }, { v: 1 }, { v: 2 }, { v: 1 }, { u: 3 }];
      const b = [{ v: 2 }, { v: 1 }, { v: 1 }, { v: 1 }, { u: 3 }];
      const c = [{ v: 2 }, { u: 4 }];
      expect(intersection([a, b])).toEqual([]);
      expect(intersection([a, b], deepEqual)).toEqual([
        { v: 2 },
        { v: 1 },
        { u: 3 },
      ]);
      expect(intersection([a, c], deepEqual)).toEqual([{ v: 2 }]);
      expect(intersection([a, b, c], deepEqual)).toEqual([{ v: 2 }]);
    });
  });
});
