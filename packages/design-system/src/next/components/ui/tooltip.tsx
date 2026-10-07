import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

/* -------------------------------------------------------------------------------------------------
 * Provider, Root
 * -----------------------------------------------------------------------------------------------*/

/**
 * Shares the open delay between tooltips, so moving from one trigger to the next opens the next at once.
 * Optional.
 */
function TooltipProvider({ delay = 500, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}

/**
 * Base UI leaves a tooltip out of the accessibility tree. The legacy Radix Tooltip gave the popup a
 * `tooltip` role and described the trigger by it, and the CMS tests query that role. This context links
 * the parts the same way.
 */
const TooltipA11yContext = React.createContext<{
  id: string;
  isPopupMounted: boolean;
  setPopupMounted: (mounted: boolean) => void;
} | null>(null);

function Tooltip(props: TooltipPrimitive.Root.Props) {
  const id = React.useId();
  const [isPopupMounted, setPopupMounted] = React.useState(false);
  const context = React.useMemo(() => ({ id, isPopupMounted, setPopupMounted }), [id, isPopupMounted]);

  return (
    <TooltipA11yContext.Provider value={context}>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipA11yContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

/**
 * The element that opens the tooltip on hover and focus. Renders a `<button>`; pass `render` to attach the
 * tooltip to your own element. Opens after 500ms, like the legacy Tooltip.
 */
const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipPrimitive.Trigger.Props>(
  ({ delay = 500, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    const a11y = React.useContext(TooltipA11yContext);
    const describedBy =
      [ariaDescribedBy, a11y?.isPopupMounted ? a11y.id : undefined].filter(Boolean).join(' ') || undefined;

    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        data-slot="tooltip-trigger"
        delay={delay}
        aria-describedby={describedBy}
        {...props}
      />
    );
  },
);

TooltipTrigger.displayName = 'TooltipTrigger';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type PositionerProps = Pick<
  TooltipPrimitive.Positioner.Props,
  'align' | 'alignOffset' | 'anchor' | 'collisionPadding' | 'side' | 'sideOffset' | 'sticky'
>;

interface TooltipContentProps extends TooltipPrimitive.Popup.Props, PositionerProps {
  /**
   * The element to render the portal into.
   * @default document.body
   */
  container?: TooltipPrimitive.Portal.Props['container'];
}

/**
 * Renders inside the popup, so it mounts and unmounts with it, and tells the trigger when to point
 * `aria-describedby` at the popup.
 */
function PopupMountSignal() {
  const setPopupMounted = React.useContext(TooltipA11yContext)?.setPopupMounted;

  React.useEffect(() => {
    if (!setPopupMounted) {
      return undefined;
    }

    setPopupMounted(true);

    return () => setPopupMounted(false);
  }, [setPopupMounted]);

  return null;
}

/**
 * The label bubble. Shows above the trigger, 8px away, in the legacy dark style.
 */
const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      className,
      side = 'top',
      sideOffset = 8,
      align = 'center',
      alignOffset = 0,
      anchor,
      collisionPadding,
      sticky,
      container,
      children,
      ...props
    },
    ref,
  ) => {
    const a11y = React.useContext(TooltipA11yContext);

    return (
      <TooltipPrimitive.Portal container={container}>
        <TooltipPrimitive.Positioner
          align={align}
          alignOffset={alignOffset}
          anchor={anchor}
          collisionPadding={collisionPadding}
          side={side}
          sideOffset={sideOffset}
          sticky={sticky}
          className="isolate z-1000"
        >
          <TooltipPrimitive.Popup
            ref={ref}
            id={a11y?.id}
            role="tooltip"
            data-slot="tooltip-content"
            className={cn(
              'w-fit origin-(--transform-origin) rounded-md bg-neutral-900 p-2 text-xs font-semibold text-neutral-0 will-change-[opacity]',
              'motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in-out',
              'data-ending-style:opacity-0 data-starting-style:opacity-0 data-instant:transition-none',
              className,
            )}
            {...props}
          >
            {children}
            <PopupMountSignal />
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    );
  },
);

TooltipContent.displayName = 'TooltipContent';

/* -------------------------------------------------------------------------------------------------
 * SimpleTooltip
 * -----------------------------------------------------------------------------------------------*/

interface SimpleTooltipProps
  extends Pick<TooltipPrimitive.Root.Props, 'defaultOpen' | 'open' | 'onOpenChange' | 'disableHoverablePopup'>,
    Pick<TooltipPrimitive.Trigger.Props, 'delay'>,
    Omit<TooltipContentProps, 'children'> {
  /**
   * The element that opens the tooltip. It must accept a ref and spread its props onto a DOM element.
   */
  children: React.ReactElement<Record<string, unknown>>;
  /**
   * The text of the tooltip. Without it, only the children render.
   */
  label?: React.ReactNode;
  /**
   * @deprecated Use `label` instead.
   */
  description?: string;
}

/**
 * The one-line API of the legacy `Tooltip`: `<SimpleTooltip label="Delete"><Button /></SimpleTooltip>`.
 * Use the parts (`Tooltip`, `TooltipTrigger`, `TooltipContent`) for anything else.
 */
const SimpleTooltip = React.forwardRef<HTMLDivElement, SimpleTooltipProps>(
  (
    { children, label, description, defaultOpen, open, onOpenChange, disableHoverablePopup, delay, ...contentProps },
    ref,
  ) => {
    const text = label || description;

    if (!text) {
      return children;
    }

    return (
      <Tooltip
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        disableHoverablePopup={disableHoverablePopup}
      >
        <TooltipTrigger delay={delay} render={children} />
        <TooltipContent ref={ref} {...contentProps}>
          {text}
        </TooltipContent>
      </Tooltip>
    );
  },
);

SimpleTooltip.displayName = 'SimpleTooltip';

export { SimpleTooltip, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
export type { SimpleTooltipProps, TooltipContentProps };
