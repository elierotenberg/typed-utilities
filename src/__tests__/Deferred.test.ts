import { AsyncResult, Deferred, sleep } from "..";

test(`Deferred`, async () => {
  const deferredNull = Deferred.defer();
  expect(AsyncResult.is.pending(deferredNull.state())).toEqual(true);

  sleep(1000).then(() => deferredNull.resolve(null));
  expect(AsyncResult.is.pending(deferredNull.state())).toEqual(true);

  expect(await deferredNull.await()).toEqual(null);
  expect(AsyncResult.is.resolved(deferredNull.state())).toEqual(true);
  expect(() => deferredNull.resolve(null)).toThrow();
  expect(() => deferredNull.reject(new Error())).toThrow();

  const deferredError = Deferred.defer();
  expect(AsyncResult.is.pending(deferredError.state())).toEqual(true);

  sleep(1000).then(() => deferredError.reject(new Error()));
  expect(AsyncResult.is.pending(deferredError.state())).toEqual(true);

  await expect(async () => await deferredError.await()).rejects.toBeTruthy();
  expect(AsyncResult.is.rejected(deferredError.state())).toEqual(true);
  expect(() => deferredError.resolve(null)).toThrow();
  expect(() => deferredError.reject(new Error())).toThrow();
});
