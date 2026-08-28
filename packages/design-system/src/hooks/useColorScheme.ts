import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

import type { ColorScheme } from '../themes';

/**
 * Toggles the `dark` class on the root element of the document.
 * The class is page-wide: two callers with different schemes overwrite each other. It stays after the caller unmounts
 */
export const useColorScheme = (colorScheme: ColorScheme) => {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', colorScheme === 'dark');
  }, [colorScheme]);
};
