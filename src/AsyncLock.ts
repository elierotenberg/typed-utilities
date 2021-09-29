import { Deferred } from "./Deferred";

export class AsyncLock {
  private queue: Promise<void>;
  private _length = 0;
  public constructor() {
    this.queue = Promise.resolve();
    this._length = 0;
  }

  public readonly use = async <T>(fn: () => Promise<T>): Promise<T> => {
    this._length++;
    const deferred = Deferred.defer<T>();
    this.queue = this.queue.finally(async () => {
      try {
        deferred.resolve(await fn());
      } catch (error) {
        deferred.reject(error);
      } finally {
        this._length--;
      }
    });
    return deferred.await();
  };

  public get length(): number {
    return this._length;
  }
}
