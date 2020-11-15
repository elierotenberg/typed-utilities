export type PromiseType<T> = T extends infer V ? V : never;
