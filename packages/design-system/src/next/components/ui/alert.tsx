import * as React from 'react';

import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { CheckCircle, Cross, Information, WarningCircle } from '@strapi/icons';
import { cva, type VariantProps } from 'class-variance-authority';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

/**
 * `--alert-accent` is the 700 shade of the variant. The icon, the links and the icons of the action use it
 */
const alertVariants = cva('group/alert flex w-full items-start gap-3 rounded-md border p-5 pr-6 shadow-filter', {
  variants: {
    variant: {
      default: 'border-primary-200 bg-primary-100 [--alert-accent:var(--primary-700)]',
      success: 'border-success-200 bg-success-100 [--alert-accent:var(--success-700)]',
      danger: 'border-danger-200 bg-danger-100 [--alert-accent:var(--danger-700)]',
      warning: 'border-warning-200 bg-warning-100 [--alert-accent:var(--warning-700)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

const DefaultIcon = ({ variant }: { variant: AlertVariant }) => {
  if (variant === 'success') {
    return <CheckCircle />;
  }

  if (variant === 'danger' || variant === 'warning') {
    return <WarningCircle />;
  }

  return <Information />;
};

interface AlertProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof alertVariants> {
  /**
   * The accessible name of the close button.
   * @default 'Close'
   */
  closeLabel?: string;
  /**
   * Replaces the icon of the variant. `null` removes it.
   */
  icon?: React.ReactNode;
  /**
   * Called when the close button is clicked. The close button shows when `onClose` or `closeLabel` is set.
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * A banner with an icon, a title, a message, an action and a close button. `children` (`AlertTitle`,
 * `AlertDescription`, `AlertAction`) render in a live region: `role="alert"` for `danger`, `role="status"` otherwise.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, closeLabel, icon, onClose, ...props }, ref) => {
    const resolvedVariant = variant ?? 'default';
    const hasCloseButton = onClose !== undefined || closeLabel !== undefined;

    return (
      <div
        ref={ref}
        data-slot="alert"
        data-variant={resolvedVariant}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon !== null ? (
          <span
            data-slot="alert-icon"
            aria-hidden
            className="flex size-5 shrink-0 text-(--alert-accent) [&_svg]:size-full"
          >
            {icon ?? <DefaultIcon variant={resolvedVariant} />}
          </span>
        ) : null}

        <div
          data-slot="alert-content"
          role={resolvedVariant === 'danger' ? 'alert' : 'status'}
          className="flex w-full flex-wrap items-start gap-1 has-data-[slot=alert-action]:gap-2"
        >
          {children}
        </div>

        {hasCloseButton ? (
          <button
            type="button"
            data-slot="alert-close"
            onClick={onClose}
            className="relative mt-1 flex size-4 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 text-neutral-700 outline-none after:absolute after:-inset-1 after:rounded-xl after:border-2 after:border-transparent after:transition-all after:duration-200 focus-visible:after:-inset-1.5 focus-visible:after:border-primary-600 [&_svg]:size-full"
          >
            <Cross aria-hidden focusable={false} />
            <span className="sr-only">{closeLabel ?? 'Close'}</span>
          </button>
        ) : null}
      </div>
    );
  },
);

Alert.displayName = 'Alert';

/* -------------------------------------------------------------------------------------------------
 * Title
 * -----------------------------------------------------------------------------------------------*/

interface AlertTitleProps extends Omit<useRender.ComponentProps<'p'>, 'ref'> {}

/**
 * The bold title. Renders a `<p>`, pass `render={<h2 />}` to change the element (the legacy `titleAs` prop).
 */
const AlertTitle = React.forwardRef<HTMLElement, AlertTitleProps>(({ className, render, ...props }, ref) => {
  return useRender({
    defaultTagName: 'p',
    ref,
    render,
    props: mergeProps<'p'>(
      {
        className: cn('text-base font-semibold text-neutral-800 medium:text-sm', className),
      },
      { ...props, 'data-slot': 'alert-title' } as React.ComponentPropsWithoutRef<'p'>,
    ),
  });
});

AlertTitle.displayName = 'AlertTitle';

/* -------------------------------------------------------------------------------------------------
 * Description
 * -----------------------------------------------------------------------------------------------*/

/**
 * The message (the legacy `children`).
 */
const AlertDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<'p'>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="alert-description"
        className={cn('text-base text-neutral-800 medium:text-sm', className)}
        {...props}
      />
    );
  },
);

AlertDescription.displayName = 'AlertDescription';

/* -------------------------------------------------------------------------------------------------
 * Action
 * -----------------------------------------------------------------------------------------------*/

/**
 * An element under the message, usually a link. Its text and icons take the accent colour of the variant.
 */
const AlertAction = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="alert-action"
        className={cn('[&_a]:text-(--alert-accent) [&_svg]:text-(--alert-accent)', className)}
        {...props}
      />
    );
  },
);

AlertAction.displayName = 'AlertAction';

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants };
export type { AlertProps, AlertTitleProps, AlertVariant };
