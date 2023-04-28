import { once, PREFIX } from './deprecations';
import { usePrevious as actualUsePrevious } from '../hooks/usePrevious';

const warnDeprecated = once(console.warn);

/**
 * @preserve
 * @deprecated usePrevious has moved. Please import it from "@strapi/design-system/hooks/usePrevious"
 */
export const usePrevious: typeof actualUsePrevious = (...args) => {
  warnDeprecated(`${PREFIX} usePrevious has moved. Please import it from "@strapi/design-system/hooks/usePrevious"`);

  return actualUsePrevious(...args);
};
