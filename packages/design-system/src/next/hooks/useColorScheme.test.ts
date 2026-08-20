import { renderHook } from '@testing-library/react';

import { useColorScheme } from './useColorScheme';

describe('useColorScheme', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('adds the dark class to the root element for the dark scheme', () => {
    renderHook(() => useColorScheme('dark'));

    expect(document.documentElement).toHaveClass('dark');
  });

  it('removes the dark class from the root element for the light scheme', () => {
    document.documentElement.classList.add('dark');

    renderHook(() => useColorScheme('light'));

    expect(document.documentElement).not.toHaveClass('dark');
  });
});
