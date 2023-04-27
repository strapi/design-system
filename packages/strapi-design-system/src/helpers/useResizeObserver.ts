import { once, PREFIX } from './deprecations';
import { useResizeObserver as actualUseResizeObserver } from '../hooks/useResizeObserver';

const warnDeprecated = once(console.warn);

/**
 * @preserve
 * @deprecated useResizeObserver has moved. Please import it from "@strapi/design-system/hooks/useResizeObserver"
 */
export const useResizeObserver: typeof actualUseResizeObserver = (...args) => {
  warnDeprecated(
    `${PREFIX} useResizeObserver has moved. Please import it from "@strapi/design-system/hooks/useResizeObserver"`,
  );

  return actualUseResizeObserver(...args);
};
