import { id } from ".";

export type MapAsync = <I, T>(
  items: readonly I[],
  fn: (item: I) => Promise<T>,
) => Promise<T[]>;

export const mapAsyncSerial: MapAsync = async <I, T>(
  items: readonly I[],
  fn: (item: I) => Promise<T>,
): Promise<T[]> => {
  const values: T[] = [];
  const errors: Error[] = [];
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
  const errors: Error[] = [];
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
  (values: readonly []): Promise<[]>;
  <T1>(values: readonly [Promise<T1>]): Promise<[T1]>;
  <T1, T2>(values: readonly [Promise<T1>, Promise<T2>]): Promise<[T1, T2]>;
  <T1, T2, T3>(
    values: readonly [Promise<T1>, Promise<T2>, Promise<T3>],
  ): Promise<[T1, T2, T3]>;
  <T1, T2, T3, T4>(
    values: readonly [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>],
  ): Promise<[T1, T2, T3, T4]>;
  <T1, T2, T3, T4, T5>(
    values: readonly [
      Promise<T1>,
      Promise<T2>,
      Promise<T3>,
      Promise<T4>,
      Promise<T5>,
    ],
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
    T18
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
    T19
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
    T20
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
};
export const resolveAllSerial = (((values: readonly Promise<unknown>[]) =>
  mapAsyncSerial(values, id)) as unknown) as ResolveAll;

export const resolveAllConcurrent = (((values: readonly Promise<unknown>[]) =>
  mapAsyncConcurrent(values, id)) as unknown) as ResolveAll;
