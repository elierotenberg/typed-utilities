import AggregateErrorPolyfill from "aggregate-error";

// eslint-disable-next-line @typescript-eslint/naming-convention
const LocalAggregateError: AggregateErrorConstructor = (typeof AggregateError !==
"undefined"
  ? AggregateError
  : AggregateErrorPolyfill) as AggregateErrorConstructor;

export { LocalAggregateError as AggregateError };
