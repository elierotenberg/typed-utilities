export type ConstructorType<C> = C extends {
  new (...args: infer Args): infer Instance;
}
  ? {
      instance: Instance;
      args: Args;
    }
  : never;
