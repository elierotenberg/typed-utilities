export class AsyncSemaphore {
  private _current: number;
  public readonly max: number;
  private readonly queue: (() => void)[];

  public constructor(max: number) {
    this.max = max;
    this._current = 0;
    this.queue = [];
  }

  private readonly run = async <T>(fn: () => Promise<T>): Promise<T> => {
    this._current++;
    try {
      return await fn();
    } finally {
      this._current--;
      this.trigger();
    }
  };

  private readonly trigger = (): void => {
    const next = this.queue.pop();
    if (next) {
      next();
    }
  };

  public readonly use = async <T>(fn: () => Promise<T>): Promise<T> => {
    if (this._current < this.max) {
      return await this.run(fn);
    }

    return await new Promise<void>((resolve) => {
      this.queue.push(resolve);
    }).then(() => this.run(fn));
  };

  public get current(): number {
    return this._current;
  }

  public get length(): number {
    return this.queue.length;
  }
}
