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
