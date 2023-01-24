/**
 * @description Simple array check.
 * @export
 * @param item
 * @returns {boolean}
 */
export function isArray(item: any): boolean {
  return item && typeof item === 'object' && Array.isArray(item);
}
