'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';

interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  /**
   * The ref of the viewport, the element that scrolls. The `ref` prop goes to the root that holds the
   * viewport and the scrollbars.
   */
  viewportRef?: React.Ref<HTMLDivElement>;
  /**
   * Classes for the viewport, the element that scrolls.
   */
  viewportClassName?: string;
}

/**
 * A scroll container with thin custom scrollbars. The scrollbars show while the pointer is over the
 * area or while it scrolls, like the legacy ScrollArea.
 */
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, viewportRef, viewportClassName, ...props }, ref) => {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        data-slot="scroll-area"
        className={cn('relative flex size-full overflow-hidden', className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          data-slot="scroll-area-viewport"
          className={cn(
            'size-full min-w-full rounded-[inherit] outline-none focus-visible:shadow-focus-inset',
            viewportClassName,
          )}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
        <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
      </ScrollAreaPrimitive.Root>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollAreaPrimitive.Scrollbar.Props>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    return (
      <ScrollAreaPrimitive.Scrollbar
        ref={ref}
        data-slot="scroll-area-scrollbar"
        orientation={orientation}
        className={cn(
          // Hidden until the pointer is over the area or it scrolls, then hidden again 600ms later
          'm-1 flex touch-none opacity-0 transition-opacity delay-500 duration-150 select-none data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:opacity-100 data-scrolling:delay-0',
          'data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:flex-col',
          'data-[orientation=vertical]:w-1',
          className,
        )}
        {...props}
      >
        <ScrollAreaPrimitive.Thumb
          data-slot="scroll-area-thumb"
          className={cn(
            'relative flex-1 rounded-md bg-neutral-150',
            // A bigger target on touch screens, see https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
            'pointer-coarse:before:absolute pointer-coarse:before:top-1/2 pointer-coarse:before:left-1/2 pointer-coarse:before:size-full pointer-coarse:before:min-h-11 pointer-coarse:before:min-w-11 pointer-coarse:before:-translate-1/2 pointer-coarse:before:content-[""]',
          )}
        />
      </ScrollAreaPrimitive.Scrollbar>
    );
  },
);

ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
export type { ScrollAreaProps };
