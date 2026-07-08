/**
 * Clamps `value` to the inclusive `[min, max]` range. Inlined from
 * `@radix-ui/number`, which is not shipped by the unified `radix-ui` package.
 */
export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(max, Math.max(min, value));
}
