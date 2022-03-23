const DEFAULT_INTERPOLATE_VARIABLE_PATTERN = /{([^{}]*)}/g;

type InterpolateParams<T> = {
  readonly template: string;
  readonly variables: Record<string, T>;
  readonly pattern?: RegExp;
  readonly strict?: boolean;
};

export const interpolate = <T>({
  template,
  variables,
  strict = false,
  pattern = DEFAULT_INTERPOLATE_VARIABLE_PATTERN,
}: InterpolateParams<T>): (string | T)[] =>
  template.split(pattern).map((part, index) => {
    if (index % 2 === 0) {
      return part;
    }
    const variable = variables[part];
    if (typeof variable === `undefined`) {
      if (strict) {
        throw new Error(`variable not found: '${part}'`);
      }
      return part;
    }
    return variable;
  });
