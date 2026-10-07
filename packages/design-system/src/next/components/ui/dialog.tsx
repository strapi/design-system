import * as React from 'react';

import { iconButtonVariants } from '@/components/ui/icon-button';
import { ScrollArea, type ScrollAreaProps } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Cross } from '@strapi/icons';

/*
 * The modal dialog. It replaces the legacy `Modal` (a Radix Dialog). The legacy `Dialog`, the confirm
 * dialog, is `AlertDialog` in this tree, as in shadcn.
 */

/* -------------------------------------------------------------------------------------------------
 * Root, Trigger, Portal, Close
 * -----------------------------------------------------------------------------------------------*/

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogPrimitive.Trigger.Props>((props, ref) => {
  return <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />;
});

DialogTrigger.displayName = 'DialogTrigger';

/**
 * The portal creates the stacking context of the layer, at the legacy overlay z-index. A dialog opened from
 * this one then stacks above it by DOM order, as in the legacy system.
 */
const DialogPortal = React.forwardRef<HTMLDivElement, DialogPrimitive.Portal.Props>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Portal
      ref={ref}
      data-slot="dialog-portal"
      className={cn('relative z-300', className)}
      {...props}
    />
  );
});

DialogPortal.displayName = 'DialogPortal';

/**
 * Closes the dialog. Renders a `<button>`; pass `render` to render your own Button.
 */
const DialogClose = React.forwardRef<HTMLButtonElement, DialogPrimitive.Close.Props>((props, ref) => {
  return <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />;
});

DialogClose.displayName = 'DialogClose';

/* -------------------------------------------------------------------------------------------------
 * Overlay
 * -----------------------------------------------------------------------------------------------*/

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogPrimitive.Backdrop.Props>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Backdrop
        ref={ref}
        data-slot="dialog-overlay"
        className={cn(
          'fixed inset-0 z-300 bg-neutral-800/20 will-change-[opacity]',
          'motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in-out',
          'data-ending-style:opacity-0 data-starting-style:opacity-0',
          className,
        )}
        {...props}
      />
    );
  },
);

DialogOverlay.displayName = 'DialogOverlay';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

interface DialogContentProps extends DialogPrimitive.Popup.Props {
  /**
   * The element to render the portal into.
   * @default document.body
   */
  container?: DialogPrimitive.Portal.Props['container'];
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, container, ...props }, ref) => {
    return (
      <DialogPortal container={container}>
        <DialogOverlay />
        <DialogPrimitive.Popup
          ref={ref}
          data-slot="dialog-content"
          className={cn(
            'fixed top-1/2 left-1/2 z-310 flex h-auto max-h-[90vh] w-[calc(100%-4rem)] max-w-208 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden medium:w-[calc(100%-4.8rem)]',
            'rounded-md bg-neutral-0 text-neutral-800 shadow-popup outline-none focus-visible:outline-none',
            // A form around the parts keeps the column layout, so the body still scrolls
            '[&>form]:flex [&>form]:min-h-0 [&>form]:flex-col [&>form]:overflow-hidden',
            'motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out',
            'data-starting-style:scale-80 data-starting-style:opacity-0',
            'data-ending-style:scale-80 data-ending-style:opacity-0 motion-safe:data-ending-style:duration-100 motion-safe:data-ending-style:ease-out',
            className,
          )}
          {...props}
        />
      </DialogPortal>
    );
  },
);

DialogContent.displayName = 'DialogContent';

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

interface DialogHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
  /**
   * The accessible name of the close button. Pass a translated string.
   * @default 'Close modal'
   */
  closeLabel?: string;
  /**
   * Whether to render the close button at the end of the header.
   * @default true
   */
  showCloseButton?: boolean;
}

const DialogHeader = React.forwardRef<HTMLElement, DialogHeaderProps>(
  ({ className, children, closeLabel = 'Close modal', showCloseButton = true, ...props }, ref) => {
    return (
      <header
        ref={ref}
        data-slot="dialog-header"
        className={cn(
          'flex items-center justify-between border-b border-neutral-150 bg-neutral-100 px-5 py-4',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            aria-label={closeLabel}
            // The legacy close button: a `tertiary` IconButton, without a tooltip
            className={iconButtonVariants({ variant: 'tertiary', size: 'S' })}
          >
            <Cross aria-hidden focusable={false} />
          </DialogPrimitive.Close>
        ) : null}
      </header>
    );
  },
);

DialogHeader.displayName = 'DialogHeader';

/* -------------------------------------------------------------------------------------------------
 * Title, Description
 * -----------------------------------------------------------------------------------------------*/

/**
 * The accessible name of the dialog. Renders an `<h2>` with the legacy `omega` type style, in bold.
 */
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogPrimitive.Title.Props>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        data-slot="dialog-title"
        className={cn('text-base font-semibold medium:text-sm', className)}
        {...props}
      />
    );
  },
);

DialogTitle.displayName = 'DialogTitle';

/**
 * An optional accessible description of the dialog. Renders a `<p>`.
 */
const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogPrimitive.Description.Props>(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        data-slot="dialog-description"
        className={cn('text-base text-neutral-600 medium:text-sm', className)}
        {...props}
      />
    );
  },
);

DialogDescription.displayName = 'DialogDescription';

/* -------------------------------------------------------------------------------------------------
 * Body
 * -----------------------------------------------------------------------------------------------*/

interface DialogBodyProps extends ScrollAreaProps {}

/**
 * The scrolling part of the dialog, between the header and the footer.
 */
const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(({ className, children, ...props }, ref) => {
  return (
    <ScrollArea ref={ref} data-slot="dialog-body" className={cn('h-auto min-h-0 px-8', className)} {...props}>
      {/* The 2px of margin and padding keep the focus ring of a field at the edge from being cropped */}
      <div className="-mx-0.5 px-0.5 py-10">{children}</div>
    </ScrollArea>
  );
});

DialogBody.displayName = 'DialogBody';

/* -------------------------------------------------------------------------------------------------
 * Footer
 * -----------------------------------------------------------------------------------------------*/

const DialogFooter = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'footer'>>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        data-slot="dialog-footer"
        className={cn(
          'flex flex-1 items-center justify-between border-t border-neutral-150 bg-neutral-100 px-5 py-4',
          className,
        )}
        {...props}
      />
    );
  },
);

DialogFooter.displayName = 'DialogFooter';

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
export type { DialogBodyProps, DialogContentProps, DialogHeaderProps };
