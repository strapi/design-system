import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

import type { ColorScheme } from '../themes';

/**
 * Toggles the `dark` class on the root element of the document
 */
export const useColorScheme = (colorScheme: ColorScheme) => {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', colorScheme === 'dark');
  }, [colorScheme]);
};
