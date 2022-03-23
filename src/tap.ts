export const tap =
  <T>(effect: (t: T) => unknown) =>
  (t: T): T => {
    effect(t);
    return t;
  };

export const tapAsync =
  <T>(effect: (t: T) => Promise<unknown>) =>
  async (t: T): Promise<T> => {
    await effect(t);
    return t;
  };
