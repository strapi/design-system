import * as React from 'react';

import { cn } from '@/lib/utils';
import { useRender } from '@base-ui/react/use-render';

interface VisuallyHiddenProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * Replaces the `<span>` with another element, for example `render={<figcaption />}`.
   * It takes the place of the legacy `tag` prop.
   */
  render?: useRender.RenderProp;
}

/**
 * Hides its content from the screen but keeps it in the accessibility tree, so a screen reader still
 * announces it.
 */
const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, render, ...props }, ref) => {
    return useRender({
      defaultTagName: 'span',
      render,
      ref,
      props: {
        'data-slot': 'visually-hidden',
        ...props,
        className: cn('sr-only', className),
      },
    });
  },
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
export type { VisuallyHiddenProps };
