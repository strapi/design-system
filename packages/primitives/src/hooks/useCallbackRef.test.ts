import { renderHook } from '@testing-library/react';

import { useCallbackRef } from './useCallbackRef';

describe('useCallbackRef', () => {
  it('should accept an untyped inline callback', () => {
    const { result } = renderHook(() => useCallbackRef((x) => x));

    expect(result.current(1)).toBe(1);
  });

  it('should accept a typed callback', () => {
    const { result } = renderHook(() => useCallbackRef((x: string) => x.length));

    expect(result.current('abc')).toBe(3);
  });
});
