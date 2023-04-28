import { once, PREFIX } from './deprecations';
import actualUseLockScroll from '../hooks/useLockScroll';

const warnDeprecated = once(console.warn);

/**
 * @preserve
 * @deprecated useLockScroll has moved. Please import it from "@strapi/design-system/hooks/useLockScroll"
 */
const useLockScroll: typeof actualUseLockScroll = (...args) => {
  warnDeprecated(
    `${PREFIX} useLockScroll has moved. Please import it from "@strapi/design-system/hooks/useLockScroll"`,
  );

  return actualUseLockScroll(...args);
};

export default useLockScroll;
