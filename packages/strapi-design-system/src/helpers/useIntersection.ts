import { useIntersection as actualUseIntersection } from '../hooks/useIntersection';
import { once, prefix } from './deprecations';

const warnDeprecated = once(console.warn);

export const useIntersection: typeof actualUseIntersection = (...args) => {
  warnDeprecated(
    `${prefix} useIntersection has moved. Please import it from "@strapi/design-system/hooks/useIntersection"`,
  );
  return actualUseIntersection(...args);
};
