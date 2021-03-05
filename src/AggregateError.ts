class AggregateErrorPolyfill extends Error {
  public errors: unknown[];
  public constructor(errors: Iterable<unknown>, message?: string) {
    super(message);
    this.errors = Array.from(errors);
    Object.setPrototypeOf(this, AggregateErrorPolyfill.prototype);
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ExportedAggregateError =
  typeof AggregateError === "undefined"
    ? AggregateErrorPolyfill
    : AggregateError;

export { ExportedAggregateError as AggregateError };
