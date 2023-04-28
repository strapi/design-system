import { once, PREFIX } from './deprecations';
import { useId as actualUseId } from '../hooks/useId';

const warnDeprecated = once(console.warn);

/**
 * @preserve
 * @deprecated useId has moved. Please import it from "@strapi/design-system/hooks/useId"
 */
export const useId: typeof actualUseId = (...args) => {
  warnDeprecated(`${PREFIX} useId has moved. Please import it from "@strapi/design-system/hooks/useId"`);

  return actualUseId(...args);
};
