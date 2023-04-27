import { once, PREFIX } from './deprecations';
import { useElementOnScreen as actualUseElementOnScreen } from '../hooks/useElementOnScreen';

const warnDeprecated = once(console.warn);

/**
 * @preserve
 * @deprecated useElementOnScreen has moved. Please import it from "@strapi/design-system/hooks/useElementOnScreen"
 */
export const useElementOnScreen: typeof actualUseElementOnScreen = (...args) => {
  warnDeprecated(
    `${PREFIX} useElementOnScreen has moved. Please import it from "@strapi/design-system/hooks/useElementOnScreen"`,
  );

  return actualUseElementOnScreen(...args);
};
