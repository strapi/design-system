export const PREFIX = '[@strapi/design-system]:';

export const once = <TArgs extends unknown[]>(fn: (...args: TArgs) => unknown) => {
  const func = fn;
  let called = false;

  if (typeof func !== 'function') {
    throw new TypeError(`${PREFIX} once requires a function parameter`);
  }

  return (...args: TArgs) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};
