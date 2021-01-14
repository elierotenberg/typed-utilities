export type PromiseType<T> = T extends Promise<infer V> ? V : never;
