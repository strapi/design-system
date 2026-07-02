import { useId as useReactId } from 'react';

/**
 * Wraps React's `useId`, returning the caller-provided `initialId` when present
 * and otherwise falling back to a generated id.
 *
 * @deprecated Use React's built-in `useId` instead. This hook only adds an
 * `initialId` fallback, which callers can handle themselves: `id ?? useId()`.
 */
export function useId(initialId?: string | number): string {
  const generatedId = useReactId();

  return initialId?.toString() ?? generatedId;
}
