import { range, dateIsoStringRegExp, naiveEmailRegExp } from "..";

describe("RegExp", () => {
  test("dateIsoStringRegExp", () => {
    const now = new Date();
    const isoString = now.toISOString();
    expect(isoString).toMatch(dateIsoStringRegExp);
    expect(` ${isoString}`).not.toMatch(dateIsoStringRegExp);
    expect(now.toString()).not.toMatch(dateIsoStringRegExp);
  });

  test("naiveEmailRegExp", () => {
    expect("user@domain.tld").toMatch(naiveEmailRegExp);
    expect("user-domain-tld").not.toMatch(naiveEmailRegExp);
    const veryLongSubDomain = range(100)
      .map(() => "subdomain")
      .join(".");
    const veryLongDomain = "domain".repeat(100);
    const veryLongTld = "tld".repeat(100);
    const veryLongUser = range(100)
      .map(() => "user")
      .join(".");
    const veryLongModifier = range(100)
      .map(() => "modifier")
      .join("+");
    expect(
      `${veryLongUser}+${veryLongModifier}@${veryLongSubDomain}.${veryLongDomain}.${veryLongTld}`,
    ).toMatch(naiveEmailRegExp);
  });
});
