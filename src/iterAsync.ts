import { AggregateError } from "./AggregateError";
import { id } from "./id";

export type MapAsync = <I, T>(
  items: readonly I[],
  fn: (item: I) => Promise<T>,
) => Promise<readonly T[]>;

export const mapAsyncSerial: MapAsync = async <I, T>(
  items: readonly I[],
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
  items: readonly I[],
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

type ResolveAll = {
  <T1>(values: readonly [Promise<T1>]): Promise<readonly [T1]>;
  <T1, T2>(values: readonly [Promise<T1>, Promise<T2>]): Promise<
    readonly [T1, T2]
  >;
  <T1, T2, T3>(
    values: readonly [Promise<T1>, Promise<T2>, Promise<T3>],
  ): Promise<readonly [T1, T2, T3]>;
  <T1, T2, T3, T4>(
    values: readonly [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>],
  ): Promise<readonly [T1, T2, T3, T4]>;
  <T1, T2, T3, T4, T5>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
    ],
  ): Promise<readonly [T1, T2, T3, T4, T5]>;
  <T1, T2, T3, T4, T5, T6>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
    ],
  ): Promise<readonly [T1, T2, T3, T4, T5, T6]>;
};

export const resolveAllSerial = (((...items: Promise<unknown>[]) =>
  mapAsyncSerial(items, id)) as unknown) as ResolveAll;

export const resolveAllConcurrent = (((...items: Promise<unknown>[]) =>
  mapAsyncConcurrent(items, id)) as unknown) as ResolveAll;
