import { Iterator } from ".";

export function* sequenceIdGenerator(
  prefix: string,
  max = Infinity,
): Iterator<string> {
  for (let id = 0; id < max; id++) {
    yield `${prefix}-${id}`;
  }
}

export const sequenceIdFn = (prefix: string, max = Infinity): (() => string) =>
  Iterator.nextify(sequenceIdGenerator(prefix, max));
