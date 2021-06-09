import { pick } from "..";

test(`pick`, () => {
  const a = {
    k1: `v1`,
    k2: `v2`,
    k3: `v3`,
  };
  expect(pick(a, [`k1`, `k3`])).toEqual({
    k1: `v1`,
    k3: `v3`,
  });
});
