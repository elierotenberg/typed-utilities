import { sortByProperty } from "..";

describe("sortByProperty", () => {
  test("single key", () => {
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

  test("multiple keys", () => {
    const a1 = {
      k1: "1",
      k2: "2",
      k3: "3",
      name: "t1",
    };
    const a2 = {
      k1: "2",
      k2: "3",
      k3: "1",
      name: "t2",
    };
    const a3 = {
      k1: "3",
      k2: "1",
      k3: "2",
      name: "t3",
    };

    const t1 = [a1, a2, a3];

    expect(t1.sort(sortByProperty("k1", "k2", "k3"))).toEqual([a1, a2, a3]);
    expect(t1.sort(sortByProperty("k2", "k1", "k3"))).toEqual([a3, a1, a2]);
    expect(t1.sort(sortByProperty("k3", "k1", "k2"))).toEqual([a2, a3, a1]);

    const b1 = {
      k1: "0",
      k2: "2",
      k3: "1",
      k4: "0",
    };

    const b2 = {
      k1: "0",
      k2: "1",
      k3: "1",
      k4: "1",
    };

    const t2 = [b1, b2];

    expect(t2.sort(sortByProperty("k1", "k2", "k3"))).toEqual([b2, b1]);
    expect(t2.sort(sortByProperty("k3", "k1", "k2"))).toEqual([b2, b1]);
    expect(t2.sort(sortByProperty("k1", "k3", "k4"))).toEqual([b1, b2]);
  });
});
