export const memoize = <P, T>(
  fn: (param: P) => T,
): readonly [fn: (param: P) => T, map: Omit<Map<P, T>, `set`>] => {
  const map: Map<P, T> = new Map();
  const fnMmemo = (param: P): T => {
    if (map.has(param)) {
      return map.get(param) as T;
    }
    map.set(param, fn(param));
    return fnMmemo(param);
  };

  return [fnMmemo, map];
};

export const weakMemoize = <P extends object, T>(
  fn: (param: P) => T,
): readonly [fn: (param: P) => T, map: Omit<WeakMap<P, T>, `set`>] => {
  const map: WeakMap<P, T> = new WeakMap();
  const fnMmemo = (param: P): T => {
    if (map.has(param)) {
      return map.get(param) as T;
    }
    map.set(param, fn(param));
    return fnMmemo(param);
  };

  return [fnMmemo, map];
};
