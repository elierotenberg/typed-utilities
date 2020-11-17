type Equals<T> = (a: T, b: T) => boolean;
const strictEquals: Equals<unknown> = (a, b) => a === b;

export const containEqualItems = <T>(
  a: T[],
  b: T[],
  equals = strictEquals,
): boolean =>
  a.length === b.length &&
  a.every((aItem) => b.some((bItem) => equals(aItem, bItem)));

export const deduplicate = <T>(t: T[], equals = strictEquals): T[] =>
  t.reduce((t, item) => {
    if (!t.find((existingItem) => equals(existingItem, item))) {
      return [...t, item];
    }
    return t;
  }, [] as T[]);

export const intersection = <T>(arrays: T[][], equals = strictEquals): T[] =>
  arrays.length === 0
    ? []
    : deduplicate(
        arrays
          .slice(1)
          .reduce(
            (t, intersection) =>
              intersection.filter((item) =>
                t.some((existingItem) => equals(item, existingItem)),
              ),
            arrays[0],
          ),
        equals,
      );

export const exactlyNone = (t: unknown[]): null => {
  if (t.length !== 0) {
    throw new Error(`expected exactly 0 items, received ${t.length}`);
  }
  return null;
};

export const exactlyOne = <T>(t: T[]): T => {
  if (t.length !== 1) {
    throw new Error(`expected exactly 1 item, received ${t.length}`);
  }
  return t[0];
};

export const exactlyOneOrNone = <T>(t: T[]): null | T => {
  if (t.length === 0) {
    return null;
  }
  if (t.length === 1) {
    return t[0];
  }
  throw new Error(`expected exactly 0 or 1 item, received ${t.length}`);
};
