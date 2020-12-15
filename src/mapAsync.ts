export type MapAsync = <I, T>(
  items: I[],
  fn: (item: I) => Promise<T>,
) => Promise<T[]>;

export const mapAsyncSerial: MapAsync = async <I, T>(
  items: I[],
  fn: (item: I) => Promise<T>,
): Promise<T[]> => {
  const results: T[] = [];
  for (const item of items) {
    results.push(await fn(item));
  }
  return results;
};

export const mapAsyncConcurrent: MapAsync = async <I, T>(
  items: I[],
  fn: (item: I) => Promise<T>,
): Promise<T[]> => {
  return (await Promise.allSettled(items.map(fn))).map((result) => {
    if (result.status === "rejected") {
      throw result.reason;
    }
    return result.value;
  });
};
