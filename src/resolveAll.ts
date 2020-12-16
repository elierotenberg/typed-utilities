type ResolveAll = <T extends readonly unknown[] | readonly [unknown]>(
  values: T,
) => Promise<
  {
    -readonly [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P];
  }
>;

type AllSettledResult<T> = Readonly<
  | { readonly status: "rejected"; readonly reason: unknown }
  | { readonly status: "fulfilled"; readonly value: T }
>;

export const resolveAll: ResolveAll = (async (values) => {
  const results = await Promise.allSettled(values);
  return ((results as unknown) as AllSettledResult<never>[]).map((result) => {
    if (result.status === "rejected") {
      throw result.reason;
    }
    return result.value;
  });
}) as ResolveAll;
