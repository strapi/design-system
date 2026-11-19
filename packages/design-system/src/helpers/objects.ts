export function isKeyOf(o: object | [] | string, s: string | number | symbol): s is keyof typeof o {
  if (typeof o === 'string') {
    return false;
  }

  return s in o;
}

/**
 * @description Simple object check.
 * @export
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}
