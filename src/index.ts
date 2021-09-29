export { AsyncLock } from "./AsyncLock";
export { AsyncResult } from "./AsyncResult";
export { Deferred } from "./Deferred";
export { Either } from "./Either";
export { Option } from "./Option";
export { Result, Err, Ok } from "./Result";
export * from "./Array";
export * from "./Base64DataUri";
export * from "./ConstructorType";
export * from "./deepTransform";
export * from "./exponentialBackOff";
export * from "./id";
export * from "./iterAsync";
export * from "./Iterator";
export * from "./lazyMemo";
export * from "./omit";
export * from "./pick";
export * from "./PromiseType";
export * from "./range";
export * from "./RegExp";
export * from "./sequenceId";
export * from "./sleep";
export * from "./sortByProperty";
export * from "./useAsync";

if (typeof AggregateError === `undefined`) {
  throw new Error(`Global AggregateError is required`);
}
