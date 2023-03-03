import { once, prefix } from './deprecations';
import { useResizeObserver as actualUseResizeObserver } from '../hooks/useResizeObserver';

const warnDeprecated = once(console.warn);

/**
 * @deprecated useResizeObserver has moved. Please import it from "@strapi/design-system/hooks/useResizeObserver"
 */
export const useResizeObserver: typeof actualUseResizeObserver = (...args) => {
  warnDeprecated(
    `${prefix} useResizeObserver has moved. Please import it from "@strapi/design-system/hooks/useResizeObserver"`,
  );

  return actualUseResizeObserver(...args);
};
