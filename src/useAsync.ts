export const useAsync = async <T, R>(
  create: () => Promise<R>,
  destroy: (resource: R) => Promise<void>,
  use: (resource: R) => Promise<T>,
): Promise<T> => {
  const r = await create();
  try {
    return await use(r);
  } finally {
    await destroy(r);
  }
};
