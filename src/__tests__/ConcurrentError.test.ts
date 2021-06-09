import { ConcurrentError } from "../ConcurrentError";

describe(`ConcurrentError`, () => {
  test(`include inner errors in stack`, () => {
    const error1 = new Error(`Error 1`);
    const error2 = new TypeError(`Error 2`);
    const error = new ConcurrentError([error1, error2]);
    expect(error.stack).toContain(`ConcurrentError: 2 errors`);
    expect(error.stack).toContain(`Error 1`);
    expect(error.stack).toContain(`Error 2`);
  });
});
