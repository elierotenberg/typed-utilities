import { id } from "..";

describe(`id`, () => {
  test(`number`, () => {
    const v = 1;
    const u = 1;
    expect(id(v) === v).toEqual(true);
    expect(id(v) === u).toEqual(true);
  });
  test(`object`, () => {
    const v = { key: `value` };
    const u = { key: `value` };
    expect(id(v) === v).toEqual(true);
    expect(id(v) === u).toEqual(false);
  });
});
