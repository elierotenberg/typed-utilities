import { id } from "./id";

export const deepTransform = (
  input: unknown,
  transform: {
    readonly key?: (key: string) => string;
    readonly value?: (value: unknown) => unknown;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  skipVisitConstructors: Function[] = [Date, Uint8Array],
  state = {
    inputTransformed: false,
    backReferences: new WeakSet(),
  },
): unknown => {
  const transformKey = transform.key ?? id;
  const transformValue = transform.value ?? id;
  if (typeof input !== `object` || input === null) {
    return transformValue(input);
  }
  if (state.backReferences.has(input)) {
    throw new Error(`circular reference`);
  }

  if (!state.inputTransformed) {
    return deepTransform(
      transformValue(input),
      transform,
      skipVisitConstructors,
      {
        ...state,
        inputTransformed: true,
      },
    );
  }

  state.backReferences.add(input);

  if (skipVisitConstructors.some((type) => input instanceof type)) {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) =>
      deepTransform(item, transform, skipVisitConstructors, {
        ...state,
        inputTransformed: false,
      }),
    );
  }

  return Object.assign(
    Object.create(Object.getPrototypeOf(input)),
    Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        transformKey(key),
        deepTransform(value, transform, skipVisitConstructors, {
          ...state,
          inputTransformed: false,
        }),
      ]),
    ),
  );
};
