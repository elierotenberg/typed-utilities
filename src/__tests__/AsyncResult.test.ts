import { AsyncResult } from "..";

test("AsyncResult", async () => {
  const testError = new Error("test error");
  const pending = AsyncResult.of.pending();
  const rejected = AsyncResult.of.rejected(testError);
  const resolved = AsyncResult.of.resolved(null);
  expect(AsyncResult.is.pending(pending)).toEqual(true);
  expect(AsyncResult.is.rejected(pending)).toEqual(false);
  expect(AsyncResult.is.resolved(pending)).toEqual(false);
  expect(() => AsyncResult.assert.pending(pending)).not.toThrow();
  expect(() => AsyncResult.assert.rejected(pending)).toThrow();
  expect(() => AsyncResult.assert.resolved(pending)).toThrow();

  expect(AsyncResult.is.pending(rejected)).toEqual(false);
  expect(AsyncResult.is.rejected(rejected)).toEqual(true);
  expect(AsyncResult.is.resolved(rejected)).toEqual(false);
  expect(() => AsyncResult.assert.pending(rejected)).toThrow();
  expect(() => AsyncResult.assert.rejected(rejected)).not.toThrow();
  expect(() => AsyncResult.assert.resolved(rejected)).toThrow();

  expect(AsyncResult.is.pending(resolved)).toEqual(false);
  expect(AsyncResult.is.rejected(resolved)).toEqual(false);
  expect(AsyncResult.is.resolved(resolved)).toEqual(true);
  expect(() => AsyncResult.assert.pending(resolved)).toThrow();
  expect(() => AsyncResult.assert.rejected(resolved)).toThrow();
  expect(() => AsyncResult.assert.resolved(resolved)).not.toThrow();

  expect(AsyncResult.to.rejectedError(rejected)).toEqual(testError);
  expect(AsyncResult.to.resolvedValue(resolved)).toEqual(null);

  const match = {
    pending: () => "pending",
    rejected: (error: Error) => `error: ${error.message}`,
    resolved: (value: null) => `value: ${value}`,
  };

  expect(AsyncResult.match(pending, match)).toEqual("pending");
  expect(AsyncResult.match(rejected, match)).toEqual("error: test error");
  expect(AsyncResult.match(resolved, match)).toEqual("value: null");
});
