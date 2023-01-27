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
export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * @description Deep merge two objects or arrays.
 * If all parameters have the same structure, ie. are objects or arrays,
 * the function will recursively merge the two structures together while maintaining the structure.
 * If the parameters do not share the same structure, the function will simply return the first parameter.
 * This is also true for when both parameters are the same until a non-shared property is encountered.
 *
 * For example:
 *   - `mergeDeep({a: 1, b: 2}, {a: 3, c: 4})` => `{a: 3, b: 2, c: 4}`
 *   - `mergeDeep({a: 2}, {a: []})` => `{a: 2}`
 *   - `mergeDeep({a: {b: 1}}, {a: {b: 2}})` => `{a: {b: 2}}`
 *   - `mergeDeep({a: [0]}, {a: [1, 2]})` => `{a: [0, 1, 2]}`
 *   - `mergeDeep({a: [{}, 1]}, {a: [{inserted: 5}, 2]})` => `{a: [{inserted: 5}, 1, 2]}`
 *   - `mergeDeep({a: [{kept: 1}, 1]}, {a: [2, {discarded: 5}]})` => `{a: [{kept: 1}, 1, 2]}`
 * @export
 * @param target The object to merge and update with new values from the different source parameters
 * @param ...sources The source objects to merge into the target
 * @returns {Record<string, any>} The new deep merged object
 */
export function mergeDeep(target: Record<string, any>, ...sources: Record<string, any>[]): Record<string, any> {
  if (!sources.length) return target;
  const source: Record<string, any> | Array<any> | undefined = sources.shift();

  if (source === undefined) return target;
  const bothAreObj = isObject(target) && isObject(source);
  const bothAreArr = isArray(target) && isArray(source);

  if (bothAreObj || bothAreArr) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(source)) {
      const isObj = isObject(source[key]);
      const isArr = isArray(source[key]);

      if (isObj || isArr) {
        if (!target[key]) Object.assign(target, { [key]: isObj ? {} : [] });
        mergeDeep(target[key], source[key]);
      } else if (bothAreObj) {
        Object.assign(target, { [key]: source[key] });
      } else {
        target.push(source[key]);
      }
    }
  }

  return mergeDeep(target, ...sources);
}
