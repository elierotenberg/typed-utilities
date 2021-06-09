import { parseBase64DataUri } from "..";

test(`parseBase64DataUri`, () => {
  expect(parseBase64DataUri(``)).toEqual(null);
  expect(parseBase64DataUri(`\`data:text/plain;,test1test2`)).toEqual(null);
  expect(
    parseBase64DataUri(
      `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`,
    ),
  ).toEqual([
    `image/png`,
    `iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`,
  ]);
});
