import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';

/*
 * The confirm dialog. It replaces the legacy `Dialog` (a Radix AlertDialog). The legacy `Modal` is `Dialog`
 * in this tree, as in shadcn.
 */

/* -------------------------------------------------------------------------------------------------
 * Root, Trigger, Portal
 * -----------------------------------------------------------------------------------------------*/

function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogPrimitive.Trigger.Props>((props, ref) => {
  return <AlertDialogPrimitive.Trigger ref={ref} data-slot="alert-dialog-trigger" {...props} />;
});

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

/**
 * The portal creates the stacking context of the layer, at the legacy overlay z-index. A dialog opened from a
 * Modal then stacks above it by DOM order, as in the legacy system, where the content was a child of the overlay.
 */
const AlertDialogPortal = React.forwardRef<HTMLDivElement, AlertDialogPrimitive.Portal.Props>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Portal
        ref={ref}
        data-slot="alert-dialog-portal"
        className={cn('relative z-300', className)}
        {...props}
      />
    );
  },
);

AlertDialogPortal.displayName = 'AlertDialogPortal';

/* -------------------------------------------------------------------------------------------------
 * Overlay
 * -----------------------------------------------------------------------------------------------*/

const AlertDialogOverlay = React.forwardRef<HTMLDivElement, AlertDialogPrimitive.Backdrop.Props>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Backdrop
        ref={ref}
        data-slot="alert-dialog-overlay"
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

AlertDialogOverlay.displayName = 'AlertDialogOverlay';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

interface AlertDialogContentProps extends AlertDialogPrimitive.Popup.Props {
  /**
   * The element to render the portal into.
   * @default document.body
   */
  container?: AlertDialogPrimitive.Portal.Props['container'];
}

const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, container, ...props }, ref) => {
    return (
      <AlertDialogPortal container={container}>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Popup
          ref={ref}
          data-slot="alert-dialog-content"
          className={cn(
            'fixed top-1/2 left-1/2 z-320 flex h-min w-[calc(100%-4rem)] max-w-105 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden',
            'rounded-md bg-neutral-0 text-neutral-800 shadow-popup outline-none',
            'motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out',
            'data-starting-style:scale-80 data-starting-style:opacity-0',
            'data-ending-style:scale-80 data-ending-style:opacity-0 motion-safe:data-ending-style:duration-100 motion-safe:data-ending-style:ease-out',
            className,
          )}
          {...props}
        />
      </AlertDialogPortal>
    );
  },
);

AlertDialogContent.displayName = 'AlertDialogContent';

/* -------------------------------------------------------------------------------------------------
 * Header, Title
 * -----------------------------------------------------------------------------------------------*/

const AlertDialogHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="alert-dialog-header"
        className={cn('flex justify-center border-b border-neutral-150 p-6', className)}
        {...props}
      />
    );
  },
);

AlertDialogHeader.displayName = 'AlertDialogHeader';

/**
 * The accessible name of the dialog. Renders an `<h2>` with the legacy `beta` type style.
 */
const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogPrimitive.Title.Props>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Title
        ref={ref}
        data-slot="alert-dialog-title"
        className={cn('text-xl leading-tight font-semibold medium:text-lg', className)}
        {...props}
      />
    );
  },
);

AlertDialogTitle.displayName = 'AlertDialogTitle';

/* -------------------------------------------------------------------------------------------------
 * Description
 * -----------------------------------------------------------------------------------------------*/

/**
 * The accessible description of the dialog. Renders a `<p>` with the legacy `omega` type style.
 */
const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogPrimitive.Description.Props>(
  ({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Description
        ref={ref}
        data-slot="alert-dialog-description"
        className={cn('text-base medium:text-sm', className)}
        {...props}
      />
    );
  },
);

AlertDialogDescription.displayName = 'AlertDialogDescription';

/* -------------------------------------------------------------------------------------------------
 * Body
 * -----------------------------------------------------------------------------------------------*/

interface AlertDialogBodyProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * An icon shown above the text, at 24px. It renders only when `children` is a string, which the
   * Body then wraps in an `AlertDialogDescription`.
   */
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const AlertDialogBody = React.forwardRef<HTMLDivElement, AlertDialogBodyProps>(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="alert-dialog-body"
        className={cn('flex flex-col items-center gap-2 px-6 py-10', className)}
        {...props}
      >
        {typeof children === 'string' ? (
          <>
            {icon ? React.cloneElement(icon, { width: 24, height: 24, 'aria-hidden': true }) : null}
            <AlertDialogDescription>{children}</AlertDialogDescription>
          </>
        ) : (
          children
        )}
      </div>
    );
  },
);

AlertDialogBody.displayName = 'AlertDialogBody';

/* -------------------------------------------------------------------------------------------------
 * Footer
 * -----------------------------------------------------------------------------------------------*/

const AlertDialogFooter = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'footer'>>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        data-slot="alert-dialog-footer"
        className={cn('flex flex-1 items-center justify-between gap-2 border-t border-neutral-150 p-4', className)}
        {...props}
      />
    );
  },
);

AlertDialogFooter.displayName = 'AlertDialogFooter';

/* -------------------------------------------------------------------------------------------------
 * Cancel, Action
 * -----------------------------------------------------------------------------------------------*/

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

type AlertDialogCloseButtonProps = AlertDialogPrimitive.Close.Props & Pick<ButtonProps, 'variant' | 'size'>;

/**
 * Closes the dialog without confirming. Renders a `tertiary` Button; pass `render` to render another element.
 */
const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCloseButtonProps>(
  ({ variant = 'tertiary', size, render, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Close
        ref={ref}
        data-slot="alert-dialog-cancel"
        render={render ?? <Button variant={variant} size={size} />}
        {...props}
      />
    );
  },
);

AlertDialogCancel.displayName = 'AlertDialogCancel';

/**
 * Confirms, then closes the dialog, like the legacy `Dialog.Action`. Put the confirm logic in `onClick`.
 * Renders a Button; pass `render` to render another element.
 */
const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogCloseButtonProps>(
  ({ variant, size, render, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Close
        ref={ref}
        data-slot="alert-dialog-action"
        render={render ?? <Button variant={variant} size={size} />}
        {...props}
      />
    );
  },
);

AlertDialogAction.displayName = 'AlertDialogAction';

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
export type { AlertDialogBodyProps, AlertDialogContentProps, AlertDialogCloseButtonProps };
