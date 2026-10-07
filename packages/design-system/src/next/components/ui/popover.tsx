import * as React from 'react';

import { ScrollArea, type ScrollAreaProps } from '@/components/ui/scroll-area';
import { useMergedRefs, useReachEnd } from '@/lib/use-reach-end';
import { cn } from '@/lib/utils';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

/* -------------------------------------------------------------------------------------------------
 * Root, Trigger
 * -----------------------------------------------------------------------------------------------*/

function Popover(props: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverPrimitive.Trigger.Props>((props, ref) => {
  return <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props} />;
});

PopoverTrigger.displayName = 'PopoverTrigger';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type PositionerProps = Pick<
  PopoverPrimitive.Positioner.Props,
  'align' | 'alignOffset' | 'anchor' | 'collisionPadding' | 'side' | 'sideOffset' | 'sticky'
>;

interface PopoverContentProps extends PopoverPrimitive.Popup.Props, PositionerProps {
  /**
   * The element to render the portal into.
   * @default document.body
   */
  container?: PopoverPrimitive.Portal.Props['container'];
}

/**
 * The floating panel. Opens below the trigger and aligned to its start, 4px away, like the legacy Popover.
 * Pass `anchor` to position it against another element (the legacy `Popover.Anchor`).
 */
const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      align = 'start',
      alignOffset = 0,
      anchor,
      collisionPadding,
      side = 'bottom',
      sideOffset = 4,
      sticky,
      container,
      ...props
    },
    ref,
  ) => {
    return (
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Positioner
          align={align}
          alignOffset={alignOffset}
          anchor={anchor}
          collisionPadding={collisionPadding}
          side={side}
          sideOffset={sideOffset}
          sticky={sticky}
          className="isolate z-500"
        >
          <PopoverPrimitive.Popup
            ref={ref}
            data-slot="popover-content"
            className={cn(
              'origin-(--transform-origin) rounded-md border border-neutral-150 bg-neutral-0 text-neutral-800 shadow-filter outline-none',
              'motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out',
              'motion-safe:data-ending-style:ease-out',
              'data-ending-style:opacity-0 data-starting-style:opacity-0',
              // The legacy slide: 10px towards the trigger
              'data-[side=bottom]:data-ending-style:-translate-y-2.5 data-[side=bottom]:data-starting-style:-translate-y-2.5',
              'data-[side=top]:data-ending-style:translate-y-2.5 data-[side=top]:data-starting-style:translate-y-2.5',
              className,
            )}
            {...props}
          />
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    );
  },
);

PopoverContent.displayName = 'PopoverContent';

/* -------------------------------------------------------------------------------------------------
 * Arrow
 * -----------------------------------------------------------------------------------------------*/

const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverPrimitive.Arrow.Props>(({ className, ...props }, ref) => {
  return (
    <PopoverPrimitive.Arrow
      ref={ref}
      data-slot="popover-arrow"
      className={cn(
        'size-2.5 rotate-45 border-neutral-150 bg-neutral-0',
        'data-[side=bottom]:-top-1.5 data-[side=bottom]:border-t data-[side=bottom]:border-l',
        'data-[side=top]:-bottom-1.5 data-[side=top]:border-r data-[side=top]:border-b',
        'data-[side=left]:-right-1.5 data-[side=left]:border-t data-[side=left]:border-r',
        'data-[side=right]:-left-1.5 data-[side=right]:border-b data-[side=right]:border-l',
        className,
      )}
      {...props}
    />
  );
});

PopoverArrow.displayName = 'PopoverArrow';

/* -------------------------------------------------------------------------------------------------
 * Title, Description
 * -----------------------------------------------------------------------------------------------*/

const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverPrimitive.Title.Props>(
  ({ className, ...props }, ref) => {
    return (
      <PopoverPrimitive.Title
        ref={ref}
        data-slot="popover-title"
        className={cn('text-sm font-semibold', className)}
        {...props}
      />
    );
  },
);

PopoverTitle.displayName = 'PopoverTitle';

const PopoverDescription = React.forwardRef<HTMLParagraphElement, PopoverPrimitive.Description.Props>(
  ({ className, ...props }, ref) => {
    return (
      <PopoverPrimitive.Description
        ref={ref}
        data-slot="popover-description"
        className={cn('text-sm text-neutral-600', className)}
        {...props}
      />
    );
  },
);

PopoverDescription.displayName = 'PopoverDescription';

/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * -----------------------------------------------------------------------------------------------*/

interface PopoverScrollAreaProps extends ScrollAreaProps {
  /**
   * Called when the end of the content scrolls into view, for example to load the next page.
   * It only fires when the content overflows.
   */
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
}

/**
 * A scroll container for long content in a Popover, 200px high like the legacy `Popover.ScrollArea`.
 */
const PopoverScrollArea = React.forwardRef<HTMLDivElement, PopoverScrollAreaProps>(
  ({ className, children, onReachEnd, viewportRef, ...props }, ref) => {
    const { rootRef, sentinelRef, enabled } = useReachEnd(onReachEnd);
    const composedViewportRef = useMergedRefs(viewportRef, rootRef);

    return (
      <ScrollArea
        ref={ref}
        data-slot="popover-scroll-area"
        className={cn('h-50', className)}
        viewportRef={composedViewportRef}
        {...props}
      >
        {children}
        {enabled ? <div ref={sentinelRef} aria-hidden className="h-px w-full" /> : null}
      </ScrollArea>
    );
  },
);

PopoverScrollArea.displayName = 'PopoverScrollArea';

export { Popover, PopoverArrow, PopoverContent, PopoverDescription, PopoverScrollArea, PopoverTitle, PopoverTrigger };
export type { PopoverContentProps, PopoverScrollAreaProps };
