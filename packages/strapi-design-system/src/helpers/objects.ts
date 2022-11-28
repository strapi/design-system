export function isKeyOf(o: object | [] | string, s: string | number | symbol): s is keyof typeof o {
  if (typeof o === 'string') {
    return false;
  }

  return s in o;
}
