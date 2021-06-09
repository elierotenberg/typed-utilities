export type IParsedBase64DataUri = Readonly<
  [mediaType: string, base64Data: string]
>;

const base64DataUri = /^data:(.*);base64,(.*)/i;
export const parseBase64DataUri = (
  input: string,
): null | IParsedBase64DataUri => {
  const result = input.match(base64DataUri);
  if (!result) {
    return null;
  }
  const [, mediaType, base64Data] = result;
  if (typeof mediaType !== `string` || typeof base64Data !== `string`) {
    return null;
  }
  return [mediaType, base64Data];
};
