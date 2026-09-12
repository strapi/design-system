import { renderHook } from '@testing-library/react';

import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('returns the initial value on the first render', () => {
    const { result } = renderHook(() => usePrevious('a'));

    expect(result.current).toBe('a');
  });

  it('returns the previous value after the value changes', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    rerender({ value: 'c' });
    expect(result.current).toBe('b');
  });

  it('keeps returning the same previous value across re-renders with an unchanged value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    // Re-render with the same value — previous must not advance to 'b'.
    rerender({ value: 'b' });
    expect(result.current).toBe('a');
  });

  it('detects changes by strict (!==) reference equality for objects', () => {
    const first = { id: 1 };
    const second = { id: 1 };
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: first },
    });

    // Different reference, structurally equal — still counts as a change.
    rerender({ value: second });
    expect(result.current).toBe(first);
  });
});
