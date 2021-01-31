export function has<T, K extends keyof T>(props: T | undefined, key: K) {
  if (props && props[key]) {
    return props[key];
  }
  return undefined;
}
