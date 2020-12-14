import { dotCase, pathCase } from "change-case";

import { deepTransform } from "..";

describe("deepTransform", () => {
  test("transform basic types", () => {
    const input = {
      a: 1,
      b: "b",
      c: null,
      d: [0, "dd", undefined],
      e: {
        f: "f",
        g: 2,
      },
      h: new Date(0),
    };

    const transform = {
      key: (key: string) => key.toUpperCase(),
      value: (value: unknown): unknown => {
        if (typeof value === "number") {
          return value + 1;
        }
        if (typeof value === "string") {
          return `${value} + ${value}`;
        }
        if (value === null) {
          return [3, "null"];
        }
        if (value instanceof Date) {
          return new Date(value.getTime() + 1000);
        }
        return value;
      },
    };

    const output = deepTransform(input, transform, [Date]);

    expect(output).toEqual({
      A: 2,
      B: "b + b",
      C: [3, "null"],
      D: [1, "dd + dd", undefined],
      E: { F: "f + f", G: 3 },
      H: new Date(1000),
    });
  });

  test("throw on circular object", () => {
    const input1: Record<string, unknown> = {
      a: 1,
    };
    input1.b = input1;
    expect(() => deepTransform(input1, {}, [])).toThrowError(
      "circular reference",
    );

    const input2: Record<string, unknown> = {
      c: 2,
    };
    input2.d = [4, input2];
    expect(() => deepTransform(input2, {}, [])).toThrowError(
      "circular reference",
    );
  });

  test("transform custom class", () => {
    const now = new Date();
    class Skipped {
      v1 = "v1";
      v2 = "v2";
      v3;
      constructor(v3: string) {
        this.v3 = v3;
      }
    }

    const transform = {
      key: (key: string) => key.toUpperCase(),
      value: (value: unknown) => {
        if (typeof value === "number") {
          return value + 1;
        }
        if (typeof value === "string") {
          return `${value} + ${value}`;
        }
        if (value instanceof Date) {
          return new Date(value.getTime() + 1000);
        }
        if (value instanceof Skipped) {
          return new Skipped(value.v3.toUpperCase());
        }
        return value;
      },
    };
    const input1 = {
      a: 1,
      b: { c: undefined, d: now },
      e: "v4",
      s: new Skipped("v3"),
    };

    const output1 = deepTransform(input1, transform, [Date, Skipped]);
    expect(output1).toEqual({
      A: 2,
      B: { C: undefined, D: new Date(now.getTime() + 1000) },
      E: "v4 + v4",
      S: { v1: "v1", v2: "v2", v3: "V3" },
    });
    expect((output1 as Record<string, unknown>).S).toBeInstanceOf(Skipped);
    const output2 = deepTransform(input1, transform, [Date]);
    expect(output2).toEqual({
      A: 2,
      B: { C: undefined, D: new Date(now.getTime() + 1000) },
      E: "v4 + v4",
      S: { V1: "v1 + v1", V2: "v2 + v2", V3: "V3 + V3" },
    });
    expect((output2 as Record<string, unknown>).S).toBeInstanceOf(Skipped);
  });

  test("encode / decode undefined", () => {
    const input = {
      a: "a",
      b: "b",
      c: undefined,
    };

    const encodeUndefinedAsString = {
      value: (value: unknown) =>
        typeof value === "undefined" ? "__undefined__" : value,
    };

    const decodeUndefinedAsString = {
      value: (value: unknown) =>
        value === "__undefined__" ? undefined : value,
    };

    expect(
      deepTransform(
        deepTransform(input, encodeUndefinedAsString, []),
        decodeUndefinedAsString,
        [],
      ),
    ).toEqual(input);

    const $undefined = Symbol("undefined");

    const encodeUndefinedAsSymbol = {
      value: (value: unknown) =>
        typeof value === "undefined" ? $undefined : value,
    };

    const decodeUndefinedAsSymbol = {
      value: (value: unknown) => (value === $undefined ? undefined : value),
    };
    expect(
      deepTransform(
        deepTransform(input, encodeUndefinedAsSymbol, []),
        decodeUndefinedAsSymbol,
      ),
    ).toEqual(input);
  });

  test("change cases", () => {
    const input = {
      camelCaseKey: "kebab-case-value",
      snake_case_key: "PascalCaseValue",
      ["Train-Case-Key"]: 0,
    };
    expect(
      deepTransform(input, {
        key: dotCase,
        value: (value: unknown) =>
          typeof value === "string" ? pathCase(value) : value,
      }),
    ).toEqual({
      "camel.case.key": "kebab/case/value",
      "snake.case.key": "pascal/case/value",
      "train.case.key": 0,
    });
  });
});
