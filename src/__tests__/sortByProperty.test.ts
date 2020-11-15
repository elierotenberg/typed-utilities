import { sortByProperty } from "../sortByProperty";

test("sortByProperty", () => {
  const t1 = {
    index: "a",
    value: "value for t1",
  };
  const t2 = {
    index: "c",
    value: "value for t2",
  };
  const t3 = {
    index: "b",
    value: "value for t3",
  };
  const t = [t1, t2, t3];
  const sortByIndex = sortByProperty("index");
  const sortByValue = sortByProperty("value");
  expect(sortByProperty("index")).toEqual(sortByIndex);
  expect(t.sort(sortByIndex)).toEqual([t1, t3, t2]);
  expect(t.sort(sortByValue)).toEqual([t1, t2, t3]);
});
