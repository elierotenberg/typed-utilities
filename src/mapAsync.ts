export type MapAsync = <I, T>(
  items: I[],
  fn: (item: I) => Promise<T>,
) => Promise<T[]>;

export const mapAsyncSerial: MapAsync = async <I, T>(
  items: I[],
  fn: (item: I) => Promise<T>,
): Promise<T[]> => {
  const values: T[] = [];
  const errors: unknown[] = [];
  for (const item of items) {
    try {
      values.push(await fn(item));
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
  return values;
};

export const mapAsyncConcurrent: MapAsync = async <I, T>(
  items: I[],
  fn: (item: I) => Promise<T>,
): Promise<T[]> => {
  const values: T[] = [];
  const errors: unknown[] = [];
  const results = await Promise.allSettled(items.map(fn));
  for (const result of results) {
    if (result.status === "fulfilled") {
      values.push(result.value);
    } else {
      errors.push(result.reason);
    }
  }
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
  return values;
};
