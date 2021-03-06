interface IAggregateError extends Error {
  errors: unknown[];
}

interface IAggregateErrorConstructor {
  new (errors: Iterable<unknown>, message?: string): IAggregateError;
}

class AggregateErrorPolyfill extends Error implements IAggregateError {
  public errors: unknown[];
  public constructor(errors: Iterable<unknown>, message?: string) {
    super(message);
    this.errors = Array.from(errors);
    Object.setPrototypeOf(this, AggregateErrorPolyfill.prototype);
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ExportedAggregateError: IAggregateErrorConstructor =
  typeof AggregateError === "undefined"
    ? AggregateErrorPolyfill
    : AggregateError;

export { ExportedAggregateError as AggregateError };
