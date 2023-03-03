import { once, prefix } from './deprecations';
import { useId as actualUseId } from '../hooks/useId';

const warnDeprecated = once(console.warn);

/**
 * @deprecated useId has moved. Please import it from "@strapi/design-system/hooks/useId"
 */
export const useId: typeof actualUseId = (...args) => {
  warnDeprecated(`${prefix} useId has moved. Please import it from "@strapi/design-system/hooks/useId"`);

  return actualUseId(...args);
};
