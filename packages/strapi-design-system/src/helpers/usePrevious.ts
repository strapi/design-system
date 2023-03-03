import { once, prefix } from './deprecations';
import { usePrevious as actualUsePrevious } from '../hooks/usePrevious';

const warnDeprecated = once(console.warn);

/**
 * @deprecated usePrevious has moved. Please import it from "@strapi/design-system/hooks/usePrevious"
 */
export const usePrevious: typeof actualUsePrevious = (...args) => {
  warnDeprecated(`${prefix} usePrevious has moved. Please import it from "@strapi/design-system/hooks/usePrevious"`);

  return actualUsePrevious(...args);
};
