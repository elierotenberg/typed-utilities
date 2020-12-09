// "sortByProperty" is memoized; instead of creating a new function each time it is called.

// However inner functions (returned by sortBy) are not.
const sortByPropertyFnCache: {
  [CacheIndex in string]: <T extends { [Key in CacheIndex]?: string }>(
    a: T,
    b: T,
  ) => number;
} = {};
// Example usage: [{ x: "b" }, { x: "a" }].sort(sortBy("x")) is [{ x: "a" }, { x: "b" }]
export const sortByProperty = <Key extends string>(
  ...keys: Key[]
): (<T extends { [K in Key]?: string }>(a: T, b: T) => number) => {
  const cacheIndex = JSON.stringify(keys);
  if (!sortByPropertyFnCache[cacheIndex]) {
    sortByPropertyFnCache[cacheIndex] = <T extends { [K in Key]?: string }>(
      a: T,
      b: T,
    ): number => {
      if (keys.length === 0) {
        return 0;
      }
      const [key, ...rest] = keys;
      const ak = a[key];
      const bk = b[key];
      if (typeof ak !== "string" && typeof bk !== "string") {
        return 0;
      }
      if (typeof ak !== "string") {
        return -1;
      }
      if (typeof bk !== "string") {
        return 1;
      }
      const value = ak.localeCompare(bk);
      if (value !== 0) {
        return value;
      }
      return sortByProperty(...rest)(a, b);
    };
  }
  return sortByPropertyFnCache[cacheIndex];
};
