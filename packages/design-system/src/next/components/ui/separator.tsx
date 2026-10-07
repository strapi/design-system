'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

/**
 * The legacy `Divider`: a 1px `neutral150` line that does not shrink in a flex parent.
 * Renders a `<div role="separator">`.
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorPrimitive.Props>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <SeparatorPrimitive
        ref={ref}
        data-slot="separator"
        orientation={orientation}
        className={cn(
          'shrink-0 border-none bg-neutral-150 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
          className,
        )}
        {...props}
      />
    );
  },
);

Separator.displayName = 'Separator';

export { Separator };
