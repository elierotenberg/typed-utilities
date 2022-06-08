import { AsyncSemaphore } from "./AsyncSemaphore";
import { id } from "./id";

type AsyncConcurrentOptions = {
  readonly maxConcurrency?: number;
};

export type MapAsync = <I, T>(
  items: readonly I[],
  fn: (item: I) => Promise<T>,
  opts?: AsyncConcurrentOptions,
) => Promise<T[]>;

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
  opts?: AsyncConcurrentOptions,
): Promise<T[]> => {
  const values: T[] = [];
  const errors: Error[] = [];
  const semaphore = new AsyncSemaphore(
    opts?.maxConcurrency ?? items.length + 1,
  );
  const results = await Promise.allSettled(
    items.map(async (item) => semaphore.use(() => fn(item))),
  );
  for (const result of results) {
    if (result.status === `fulfilled`) {
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

type MapEntriesAsync<T> = {
  readonly [K in keyof T]: T[K] extends PromiseLike<infer U> ? U : T;
};

export const mapEntriesAsyncConcurrent = async <T>(
  entries: T,
  opts?: AsyncConcurrentOptions,
): Promise<MapEntriesAsync<T>> => {
  const resolvedEntries = await resolveAllConcurrent(
    Object.entries(entries).map(
      async ([key, value]) => [key, await value] as const,
    ),
    opts,
  );
  return Object.fromEntries(resolvedEntries) as MapEntriesAsync<T>;
};

export const mapEntriesAsyncSerial = async <T>(
  entries: T,
): Promise<MapEntriesAsync<T>> => {
  const resolvedEntries = await resolveAllSerial(
    Object.entries(entries).map(
      async ([key, value]) => [key, await value] as const,
    ),
  );
  return Object.fromEntries(resolvedEntries) as MapEntriesAsync<T>;
};

type ResolveAll = {
  (values: readonly [], opts?: AsyncConcurrentOptions): Promise<[]>;
  <T1>(values: readonly [Promise<T1>], opts?: AsyncConcurrentOptions): Promise<
    [T1]
  >;
  <T1, T2>(
    values: readonly [Promise<T1>, Promise<T2>],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2]>;
  <T1, T2, T3>(
    values: readonly [Promise<T1>, Promise<T2>, Promise<T3>],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3]>;
  <T1, T2, T3, T4>(
    values: readonly [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4]>;
  <T1, T2, T3, T4, T5>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5]>;
  <T1, T2, T3, T4, T5, T6>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6]>;
  <T1, T2, T3, T4, T5, T6, T7>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
  <T1, T2, T3, T4, T5, T6, T7, T8>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
    ],
  ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
      Promise<T14>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
      Promise<T14>,
      Promise<T15>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<
    [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]
  >;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
      Promise<T14>,
      Promise<T15>,
      Promise<T16>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<
    [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]
  >;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
      Promise<T14>,
      Promise<T15>,
      Promise<T16>,
      Promise<T17>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<
    [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17]
  >;
  <
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14,
    T15,
    T16,
    T17,
    T18,
  >(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
      Promise<T14>,
      Promise<T15>,
      Promise<T16>,
      Promise<T17>,
      Promise<T18>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<
    [
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
    ]
  >;
  <
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14,
    T15,
    T16,
    T17,
    T18,
    T19,
  >(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
      Promise<T14>,
      Promise<T15>,
      Promise<T16>,
      Promise<T17>,
      Promise<T18>,
      Promise<T19>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<
    [
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
    ]
  >;
  <
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14,
    T15,
    T16,
    T17,
    T18,
    T19,
    T20,
  >(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
      Promise<T6>,
      Promise<T7>,
      Promise<T8>,
      Promise<T9>,
      Promise<T10>,
      Promise<T11>,
      Promise<T12>,
      Promise<T13>,
      Promise<T14>,
      Promise<T15>,
      Promise<T16>,
      Promise<T17>,
      Promise<T18>,
      Promise<T19>,
      Promise<T20>,
    ],
    opts?: AsyncConcurrentOptions,
  ): Promise<
    [
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
    ]
  >;
  <T>(values: readonly Promise<T>[], opts?: AsyncConcurrentOptions): Promise<
    T[]
  >;
};
export const resolveAllSerial = ((values: readonly Promise<unknown>[]) =>
  mapAsyncSerial(values, id)) as unknown as ResolveAll;

export const resolveAllConcurrent = ((
  values: readonly Promise<unknown>[],
  opts?: AsyncConcurrentOptions,
) => mapAsyncConcurrent(values, id, opts)) as unknown as ResolveAll;
