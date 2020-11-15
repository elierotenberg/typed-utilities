export const pick = <T, K extends keyof T>(
  source: T,
  keys: readonly K[],
): Pick<T, K> =>
  Array.from(Object.entries(source)).reduce(
    (target, [key, value]) =>
      keys.includes(key as K)
        ? {
            ...target,
            [key]: value,
          }
        : target,
    {},
  ) as Pick<T, K>;
