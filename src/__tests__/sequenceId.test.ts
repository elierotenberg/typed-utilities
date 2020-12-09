import { Iterator, range, sequenceIdFn, sequenceIdGenerator } from "..";

describe("sequenceId", () => {
  describe("sequenceIdGenerator", () => {
    test("unbounded", () => {
      const seq = Iterator.nextify(sequenceIdGenerator("test"));
      const ids = range(10).map(() => seq());
      expect(ids).toEqual([
        "test-0",
        "test-1",
        "test-2",
        "test-3",
        "test-4",
        "test-5",
        "test-6",
        "test-7",
        "test-8",
        "test-9",
      ]);
    });

    test("bounded", () => {
      const seq = Iterator.nextify(sequenceIdGenerator("test", 5));
      const ids = range(5).map(() => seq());
      expect(ids).toEqual(["test-0", "test-1", "test-2", "test-3", "test-4"]);
      expect(() => seq()).toThrow();
    });
  });

  describe("sequenceIdFn", () => {
    test("unbounded", () => {
      const seq = sequenceIdFn("test");
      const ids = range(10).map(() => seq());
      expect(ids).toEqual([
        "test-0",
        "test-1",
        "test-2",
        "test-3",
        "test-4",
        "test-5",
        "test-6",
        "test-7",
        "test-8",
        "test-9",
      ]);
    });

    test("bounded", () => {
      const seq = sequenceIdFn("test", 5);
      const ids = range(5).map(() => seq());
      expect(ids).toEqual(["test-0", "test-1", "test-2", "test-3", "test-4"]);
      expect(() => seq()).toThrow();
    });
  });
});
