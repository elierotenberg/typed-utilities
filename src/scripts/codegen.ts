import { range } from "../range";

const genAsyncResultJoinType = (k: number): string => {
  const t = range(k).map((k) => `V${k + 1}`);
  return `${
    k === 0
      ? ""
      : `<${t.join(", ")}>(values: readonly [${t
          .map((t) => `AsyncResult<${t}>`)
          .join(", ")}]): AsyncResult<[${t.join(", ")}], AggregateError>;`
  }`;
};

const genAsyncResultJoinTypes = (n: number): string =>
  [
    `type Join = {`,
    ...range(n + 1).map((k) => `  ${genAsyncResultJoinType(k)}`),
    `<V>(values: readonly AsyncResult<V>[]): AsyncResult<V[], AggregateError>;`,
    `};`,
  ].join("\n");

const genResolveAllType = (k: number): string => {
  const t = range(k).map((k) => `T${k + 1}`);
  return `${k === 0 ? "" : `<${t.join(", ")}>`}(values: readonly [${t
    .map((t) => `Promise<${t}>`)
    .join(", ")}]): Promise<[${t}]>;`;
};

const genResolveAllTypes = (n: number): string =>
  [
    `type ResolveAll = {`,
    ...range(n + 1).map((k) => `  ${genResolveAllType(k)}`),
    `};`,
  ].join("\n");

if (require.main === module) {
  console.log("------- resolveAll --------");
  console.log(genResolveAllTypes(20));

  console.log("---------- Join -----------");
  console.log(genAsyncResultJoinTypes(20));
}
