import { omit } from "..";

test(`omit`, () => {
  const a = {
    k1: `v1`,
    k2: `v2`,
    k3: `v3`,
  };
  expect(omit(a, [`k1`, `k3`])).toEqual({
    k2: `v2`,
  });
});
