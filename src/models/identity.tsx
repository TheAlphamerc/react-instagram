export function identity<Type>(arg: Type | undefined): Type | null {
  if (arg === undefined) {
    return null;
  }
  return arg;
}
