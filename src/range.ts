export const range = (length: number): number[] => {
  if (!Number.isInteger(length) || length < 0) {
    throw new TypeError("length must be a non-negative integer");
  }
  const t = [];
  for (let k = 0; k < length; k++) {
    t.push(k);
  }
  return t;
};

export const inRange = (
  input: number,
  range: [min: number, max: number],
): boolean => input >= range[0] && input <= range[1];
