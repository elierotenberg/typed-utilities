import { interpolate } from "../interpolate";

test(`interpolate`, () => {
  expect(interpolate({ template: `no part`, variables: {} })).toEqual([
    `no part`,
  ]);
  expect(
    interpolate({
      template: `Hello {subject}, today is {today}`,
      variables: {
        subject: { firstName: `John`, lastName: `Doe` },
        today: new Date(0),
      },
    }),
  ).toEqual([
    `Hello `,
    { firstName: `John`, lastName: `Doe` },
    `, today is `,
    new Date(0),
    ``,
  ]);
  expect(
    interpolate({
      template: `Hello [[subject]], today is [[today]]`,
      variables: {
        subject: { firstName: `Jane`, lastName: `Doe` },
        today: new Date(0),
      },
      pattern: /\[\[([^\[\]]*)\]\]/g,
    }),
  ).toEqual([
    `Hello `,
    { firstName: `Jane`, lastName: `Doe` },
    `, today is `,
    new Date(0),
    ``,
  ]);
  expect(interpolate({ template: `{a} {b}`, variables: { a: `A` } })).toEqual([
    ``,
    `A`,
    ` `,
    `b`,
    ``,
  ]);
  expect(() =>
    interpolate({ template: `{a} {b}`, variables: { a: `A` }, strict: true }),
  ).toThrow();
});
