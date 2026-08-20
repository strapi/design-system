import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

import type { ColorScheme } from '../../themes';

/**
 * Puts the `dark` class on the root element of the document, which is how the `@strapi/design-system/next`
 * components read the color scheme. `DesignSystemProvider` calls this for you. Call it yourself only if
 * you use the `/next` components without that provider.
 */
export const useColorScheme = (colorScheme: ColorScheme) => {
  // Tailwind reads this class from an ancestor, and the root element is the one ancestor of every node
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', colorScheme === 'dark');
  }, [colorScheme]);
};
