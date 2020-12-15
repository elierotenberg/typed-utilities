type ResolveAll1 = <T1>(values: [Promise<T1>]) => Promise<[T1]>;
type ResolveAll2 = <T1, T2>(
  values: [Promise<T1>, Promise<T2>],
) => Promise<[T1, T2]>;
type ResolveAll3 = <T1, T2, T3>(
  values: [Promise<T1>, Promise<T2>, Promise<T3>],
) => Promise<[T1, T2, T3]>;
type ResolveAll4 = <T1, T2, T3, T4>(
  values: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>],
) => Promise<[T1, T2, T3, T4]>;
type ResolveAll5 = <T1, T2, T3, T4, T5>(
  values: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>, Promise<T5>],
) => Promise<[T1, T2, T3, T4, T5]>;
type ResolveAll6 = <T1, T2, T3, T4, T5, T6>(
  values: [
    Promise<T1>,
    Promise<T2>,
    Promise<T3>,
    Promise<T4>,
    Promise<T5>,
    Promise<T6>,
  ],
) => Promise<[T1, T2, T3, T4, T5, T6]>;
type ResolveAll7 = <T1, T2, T3, T4, T5, T6, T7>(
  values: [
    Promise<T1>,
    Promise<T2>,
    Promise<T3>,
    Promise<T4>,
    Promise<T5>,
    Promise<T6>,
    Promise<T7>,
  ],
) => Promise<[T1, T2, T3, T4, T5, T6, T7]>;
type ResolveAll8 = <T1, T2, T3, T4, T5, T6, T7, T8>(
  values: [
    Promise<T1>,
    Promise<T2>,
    Promise<T3>,
    Promise<T4>,
    Promise<T5>,
    Promise<T6>,
    Promise<T7>,
    Promise<T8>,
  ],
) => Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
type ResolveAll9 = <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  values: [
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
) => Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
type ResolveAllIter = <T>(values: Promise<T>[]) => Promise<T[]>;
type ResolveAll = ResolveAll1 &
  ResolveAll2 &
  ResolveAll3 &
  ResolveAll4 &
  ResolveAll5 &
  ResolveAll6 &
  ResolveAll7 &
  ResolveAll8 &
  ResolveAll9 &
  ResolveAllIter;

export const resolveAll = (async <T extends Promise<unknown>>(
  values: T[],
): Promise<T[]> => {
  const results = await Promise.allSettled(values);
  return results.map((result) => {
    if (result.status === "rejected") {
      throw result.reason;
    }
    return result.value;
  }) as T[];
}) as ResolveAll;
