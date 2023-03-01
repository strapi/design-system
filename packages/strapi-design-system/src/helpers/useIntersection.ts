import { once, prefix } from './deprecations';
import { useIntersection as actualUseIntersection } from '../hooks/useIntersection';

const warnDeprecated = once(console.warn);

export const useIntersection: typeof actualUseIntersection = (...args) => {
  warnDeprecated(
    `${prefix} useIntersection has moved. Please import it from "@strapi/design-system/hooks/useIntersection"`,
  );

  return actualUseIntersection(...args);
};
