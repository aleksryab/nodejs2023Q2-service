export function omitObjectProps<T extends Record<K, any>, K extends keyof T>(
  obj: T,
  props: K | K[],
) {
  const result = { ...obj };

  if (Array.isArray(props)) {
    props.forEach((prop) => delete result[prop]);
  } else {
    delete result[props];
  }

  return result;
}
