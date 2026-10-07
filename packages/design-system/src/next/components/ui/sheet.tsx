import * as React from 'react';

import { iconButtonVariants } from '@/components/ui/icon-button';
import { ScrollArea, type ScrollAreaProps } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { Cross } from '@strapi/icons';
import { cva, type VariantProps } from 'class-variance-authority';

/*
 * A panel that slides in from an edge of the screen, as in shadcn. There is no legacy counterpart. It is a
 * Base UI Dialog, so it is modal by default; pass `modal={false}` to `Sheet` for a panel the page stays usable
 * behind, and `disablePointerDismissal` to keep it open on an outside press.
 */

/** The duration of the slide, in ms. Wait for it before cleaning up after a close (e.g. a URL param). */
const SHEET_ANIMATION_MS = 300;

/* -------------------------------------------------------------------------------------------------
 * Root, Trigger, Close, Portal
 * -----------------------------------------------------------------------------------------------*/

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetPrimitive.Trigger.Props>((props, ref) => {
  return <SheetPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />;
});

SheetTrigger.displayName = 'SheetTrigger';

/**
 * Closes the sheet. Renders a `<button>`; pass `render` to render your own Button.
 */
const SheetClose = React.forwardRef<HTMLButtonElement, SheetPrimitive.Close.Props>((props, ref) => {
  return <SheetPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />;
});

SheetClose.displayName = 'SheetClose';

/**
 * The portal creates the stacking context of the layer, at the legacy overlay z-index, like the Dialog.
 */
const SheetPortal = React.forwardRef<HTMLDivElement, SheetPrimitive.Portal.Props>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Portal ref={ref} data-slot="sheet-portal" className={cn('relative z-300', className)} {...props} />
  );
});

SheetPortal.displayName = 'SheetPortal';

/* -------------------------------------------------------------------------------------------------
 * Overlay
 * -----------------------------------------------------------------------------------------------*/

const SheetOverlay = React.forwardRef<HTMLDivElement, SheetPrimitive.Backdrop.Props>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Backdrop
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 bg-neutral-800/20',
        'motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out',
        'data-ending-style:opacity-0 data-starting-style:opacity-0',
        className,
      )}
      {...props}
    />
  );
});

SheetOverlay.displayName = 'SheetOverlay';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

/*
 * The popup places and slides the sheet; the panel inside it carries the look. `responsive` is a bottom sheet
 * on small screens and a rail on the right from `medium` up, both as tall as their content
 */
const sheetContentVariants = cva(
  [
    'fixed flex max-h-dvh flex-col outline-none focus-visible:outline-none',
    'motion-safe:transition motion-safe:duration-300 motion-safe:ease-out',
    'data-ending-style:pointer-events-none',
  ],
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 data-ending-style:-translate-y-full data-starting-style:-translate-y-full',
        right:
          'inset-y-0 right-0 w-3/4 medium:w-100 data-ending-style:translate-x-full data-starting-style:translate-x-full',
        bottom: 'inset-x-0 bottom-0 data-ending-style:translate-y-full data-starting-style:translate-y-full',
        left: 'inset-y-0 left-0 w-3/4 medium:w-100 data-ending-style:-translate-x-full data-starting-style:-translate-x-full',
        responsive: [
          'inset-x-0 bottom-0 data-ending-style:translate-y-full data-starting-style:translate-y-full',
          'medium:left-auto medium:w-100',
          'medium:data-ending-style:translate-x-full medium:data-ending-style:translate-y-0',
          'medium:data-starting-style:translate-x-full medium:data-starting-style:translate-y-0',
        ],
      },
      floating: {
        true: 'p-2',
        false: '',
      },
    },
    defaultVariants: {
      side: 'right',
      floating: false,
    },
  },
);

const sheetPanelVariants = cva(
  'flex min-h-0 w-full flex-1 flex-col overflow-hidden border-0 border-solid border-neutral-150 bg-neutral-0 text-neutral-800 shadow-popup',
  {
    variants: {
      side: {
        top: 'border-b',
        right: 'border-l',
        bottom: 'border-t',
        left: 'border-r',
        responsive: 'border-t medium:border-t-0 medium:border-l',
      },
      floating: {
        // A card with a gap to the edges of the screen, on every side
        true: 'rounded-md border medium:border',
        false: '',
      },
    },
    defaultVariants: {
      side: 'right',
      floating: false,
    },
  },
);

interface SheetContentProps
  extends Omit<SheetPrimitive.Popup.Props, 'className'>,
    VariantProps<typeof sheetContentVariants> {
  /**
   * Classes of the panel: its size (`medium:w-120`, `max-h-[60dvh]`, …) and look.
   */
  className?: string;
  /**
   * The element to render the portal into.
   * @default document.body
   */
  container?: SheetPrimitive.Portal.Props['container'];
  /**
   * Classes of the portal, the stacking context of the sheet, e.g. `z-200` to sit below the dialogs.
   */
  portalClassName?: string;
  /**
   * Whether to dim the page behind the sheet. Turn it off for a sheet with `modal={false}`.
   * @default true
   */
  showOverlay?: boolean;
  /**
   * Whether to render the close button in the top right corner.
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * The accessible name of the close button. Pass a translated string.
   * @default 'Close'
   */
  closeLabel?: string;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  (
    {
      side = 'right',
      floating = false,
      className,
      container,
      portalClassName,
      showOverlay = true,
      showCloseButton = true,
      closeLabel = 'Close',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <SheetPortal container={container} className={portalClassName}>
        {showOverlay ? <SheetOverlay /> : null}
        <SheetPrimitive.Popup
          ref={ref}
          data-slot="sheet-content"
          data-side={side}
          className={sheetContentVariants({ side, floating })}
          {...props}
        >
          <div data-slot="sheet-panel" className={cn(sheetPanelVariants({ side, floating }), 'relative', className)}>
            {children}
            {showCloseButton ? (
              <SheetPrimitive.Close
                data-slot="sheet-close"
                aria-label={closeLabel}
                className={cn(iconButtonVariants({ variant: 'ghost', size: 'S' }), 'absolute top-4 right-4')}
              >
                <Cross aria-hidden focusable={false} />
              </SheetPrimitive.Close>
            ) : null}
          </div>
        </SheetPrimitive.Popup>
      </SheetPortal>
    );
  },
);

SheetContent.displayName = 'SheetContent';

/* -------------------------------------------------------------------------------------------------
 * Header, Title, Description
 * -----------------------------------------------------------------------------------------------*/

const SheetHeader = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'header'>>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        data-slot="sheet-header"
        className={cn('flex shrink-0 flex-col gap-1 py-4 pr-14 pl-5', className)}
        {...props}
      />
    );
  },
);

SheetHeader.displayName = 'SheetHeader';

/**
 * The accessible name of the sheet. Renders an `<h2>` with the legacy `delta` type style.
 */
const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetPrimitive.Title.Props>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn('m-0 text-lg font-semibold medium:text-base medium:leading-tight', className)}
      {...props}
    />
  );
});

SheetTitle.displayName = 'SheetTitle';

/**
 * An optional accessible description of the sheet. Renders a `<p>`.
 */
const SheetDescription = React.forwardRef<HTMLParagraphElement, SheetPrimitive.Description.Props>(
  ({ className, ...props }, ref) => {
    return (
      <SheetPrimitive.Description
        ref={ref}
        data-slot="sheet-description"
        className={cn('m-0 text-base text-neutral-600 medium:text-sm', className)}
        {...props}
      />
    );
  },
);

SheetDescription.displayName = 'SheetDescription';

/* -------------------------------------------------------------------------------------------------
 * Body, Footer
 * -----------------------------------------------------------------------------------------------*/

interface SheetBodyProps extends ScrollAreaProps {}

/**
 * The scrolling part of the sheet, between the header and the footer.
 */
const SheetBody = React.forwardRef<HTMLDivElement, SheetBodyProps>(({ className, children, ...props }, ref) => {
  return (
    <ScrollArea ref={ref} data-slot="sheet-body" className={cn('h-auto min-h-0 flex-1 px-5', className)} {...props}>
      {/* The 2px of margin and padding keep the focus ring of a field at the edge from being cropped */}
      <div className="-mx-0.5 px-0.5 py-4">{children}</div>
    </ScrollArea>
  );
});

SheetBody.displayName = 'SheetBody';

const SheetFooter = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'footer'>>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        data-slot="sheet-footer"
        className={cn(
          'mt-auto flex shrink-0 items-center justify-between gap-2 border-0 border-t border-solid border-neutral-150 px-5 py-4',
          className,
        )}
        {...props}
      />
    );
  },
);

SheetFooter.displayName = 'SheetFooter';

export {
  SHEET_ANIMATION_MS,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  sheetContentVariants,
};
export type { SheetBodyProps, SheetContentProps };
