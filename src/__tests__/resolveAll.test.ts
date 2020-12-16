import { resolveAll } from "../resolveAll";

test("resolveAll", async () => {
  const t = [0, 3, null];
  // typeof p1 = [0, 3, null]
  const p1 = await resolveAll([
    Promise.resolve(0),
    Promise.resolve(3),
    Promise.resolve(null),
  ]);
  expect(p1).toEqual(t);

  // typeof p2 = (number | null)[]
  const p2 = await resolveAll([0, 3, null].map((v) => Promise.resolve(v)));
  expect(p2).toEqual(t);

  await expect(() =>
    resolveAll([
      Promise.resolve(0),
      Promise.reject("some error"),
      Promise.resolve(null),
    ]),
  ).rejects.toEqual("some error");

  let count = 0;
  await expect(() =>
    resolveAll([
      Promise.resolve().then(() => count++),
      Promise.resolve().then(() => count++),
      Promise.reject(new Error()),
      Promise.resolve().then(() => count++),
      Promise.reject(new Error()),
    ]),
  ).rejects.toBeTruthy();
  expect(count).toEqual(3);
});
