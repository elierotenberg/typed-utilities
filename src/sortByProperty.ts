// "sortBy" is memoized; instead of creating a new function each time it is called.
// However inner functions (returned by sortBy) are not.
const sortByPropertyFnCache: {
  [K in string]: <T extends { [Key in K]?: string }>(a: T, b: T) => number;
} = {};
// Example usage: [{ x: "b" }, { x: "a" }].sort(sortBy("x")) is [{ x: "a" }, { x: "b" }]
export const sortByProperty = <K extends string>(
  k: K,
): (<T extends { [Key in K]?: string }>(a: T, b: T) => number) => {
  if (!sortByPropertyFnCache[k]) {
    sortByPropertyFnCache[k] = <T extends { [Key in K]?: string }>(
      a: T,
      b: T,
    ): number => {
      const ak = a[k];
      const bk = b[k];
      if (typeof ak !== "string" && typeof bk !== "string") {
        return 0;
      }
      if (typeof ak !== "string") {
        return -1;
      }
      if (typeof bk !== "string") {
        return 1;
      }
      return ak.localeCompare(bk);
    };
  }
  return sortByPropertyFnCache[k];
};
