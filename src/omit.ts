export const omit = <T, K extends keyof T>(
  source: T,
  keys: readonly K[],
): Omit<T, K> =>
  Array.from(Object.entries(source)).reduce(
    (target, [key, value]) =>
      keys.includes(key as K) ? target : { ...target, [key]: value },
    {},
  ) as Omit<T, K>;
