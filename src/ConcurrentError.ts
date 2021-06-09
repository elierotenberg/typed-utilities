export class ConcurrentError extends Error {
  public readonly errors: readonly Error[];
  constructor(errors: Error[]) {
    super(`ConcurrentError: ${errors.length} errors`);
    const superStack = this.stack;
    this.errors = errors;
    this.stack = `${superStack}\n${errors
      .map((error) => {
        if (!error.stack) {
          return `${error.name}: ${error.message}`;
        }
        return error.stack.split(`\n`);
      })
      .flat()
      .join(`\n`)}`;
    // See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ConcurrentError.prototype);
  }
}
