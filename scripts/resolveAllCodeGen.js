let types = [];
for (let numArgs = 1; numArgs < 10; numArgs++) {
  const args = [];
  for (let numArg = 1; numArg <= numArgs; numArg++) {
    args.push(numArg);
  }
  const seq = args.map((arg) => `T${arg}`).join(", ");
  const promiseSeq = args.map((arg) => `Promise<T${arg}>`).join(", ");
  const type = `ResolveAll${numArgs}`;
  console.log(
    `type ${type} = <${seq}>(values: [${promiseSeq}]) => Promise<[${seq}]>;`,
  );
  types.push(type);
}

console.log(`type ResolveAllIter = <T>(values: Promise<T>[]) => Promise<T[]>;`);
types.push(`ResolveAllIter`);
console.log(`type ResolveAll = ${types.join(" & ")}`);
