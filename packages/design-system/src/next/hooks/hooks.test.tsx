import * as React from 'react';

import { render, renderHook, screen } from '@testing-library/react';

import { useCallbackRef, useCollator, useComposedRefs, useDateFormatter, useFilter } from './index';

describe('next hooks', () => {
  it('useComposedRefs sets every ref to the node', () => {
    const objectRef = React.createRef<HTMLButtonElement>();
    const callbackRef = jest.fn();

    const Component = () => {
      const ref = useComposedRefs<HTMLButtonElement>(objectRef, callbackRef);

      return <button ref={ref}>Save</button>;
    };

    render(<Component />);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(objectRef.current).toBe(button);
    expect(callbackRef).toHaveBeenCalledWith(button);
  });

  it('useCallbackRef keeps a stable function that calls the latest callback', () => {
    const first = jest.fn();
    const second = jest.fn();

    const { result, rerender } = renderHook(({ callback }) => useCallbackRef(callback), {
      initialProps: { callback: first },
    });

    const stable = result.current;

    rerender({ callback: second });
    result.current('value');

    expect(result.current).toBe(stable);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('value');
  });

  it('useCollator compares strings for the locale and caches the collator', () => {
    const { result } = renderHook(() => useCollator('en', { sensitivity: 'base' }));
    const { result: again } = renderHook(() => useCollator('en', { sensitivity: 'base' }));

    expect(result.current.compare('a', 'A')).toBe(0);
    expect(['b', 'a', 'c'].sort(result.current.compare)).toEqual(['a', 'b', 'c']);
    expect(again.current).toBe(result.current);
  });

  it('useFilter matches the start, the end and the middle of a string', () => {
    const { result } = renderHook(() => useFilter('en', { sensitivity: 'base' }));

    expect(result.current.startsWith('Strapi', 'str')).toBe(true);
    expect(result.current.endsWith('Strapi', 'API')).toBe(true);
    expect(result.current.contains('Design system', 'SIGN')).toBe(true);
    expect(result.current.contains('Design system', 'xyz')).toBe(false);
  });

  it('useDateFormatter formats a date and keeps the formatter while the options are equal', () => {
    const { result, rerender } = renderHook(({ options }) => useDateFormatter('en-GB', options), {
      initialProps: { options: { month: 'long', timeZone: 'UTC' } as Intl.DateTimeFormatOptions },
    });

    const formatter = result.current;

    expect(formatter.format(new Date(Date.UTC(2023, 0, 15)))).toBe('January');

    rerender({ options: { month: 'long', timeZone: 'UTC' } });

    expect(result.current).toBe(formatter);
  });
});
