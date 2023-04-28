import { once, PREFIX } from './deprecations';
import { useIntersection as actualUseIntersection } from '../hooks/useIntersection';

const warnDeprecated = once(console.warn);

/**
 * @preserve
 * @deprecated useId has moved. Please import it from "@strapi/design-system/hooks/useId"
 */
export const useIntersection: typeof actualUseIntersection = (...args) => {
  warnDeprecated(
    `${PREFIX} useIntersection has moved. Please import it from "@strapi/design-system/hooks/useIntersection"`,
  );

  return actualUseIntersection(...args);
};
