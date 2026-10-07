import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { BUTTON_VARIANT_CLASSES } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

/*
 * The look of the legacy IconButton: the colours of the Button, a 16px icon centred in a square box
 */
const iconButtonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-solid no-underline',
    'motion-safe:transition-colors motion-safe:duration-120 motion-safe:ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary-600',
    'aria-disabled:cursor-default aria-disabled:border-neutral-200 aria-disabled:bg-neutral-150 aria-disabled:text-neutral-600',
  ],
  {
    variants: {
      variant: BUTTON_VARIANT_CLASSES,
      size: {
        XS: 'size-8 medium:size-6',
        S: 'size-10 medium:size-8',
        M: 'size-10 medium:size-9',
        L: 'size-12 medium:size-10',
      },
    },
    compoundVariants: [
      {
        variant: 'tertiary',
        className: 'text-neutral-500 hover:not-aria-disabled:text-neutral-600',
      },
    ],
    defaultVariants: {
      variant: 'tertiary',
      size: 'S',
    },
  },
);

interface IconButtonProps
  extends Omit<ButtonPrimitive.Props, 'className' | 'children'>,
    VariantProps<typeof iconButtonVariants> {
  /**
   * The icon. It is hidden from assistive technologies, the `label` names the button.
   */
  children: React.ReactNode;
  className?: string;
  /**
   * The accessible name of the button. It is not shown, except in the tooltip.
   */
  label: string;
  /**
   * Shows the `label` in a tooltip on hover and focus.
   * @default true
   */
  withTooltip?: boolean;
}

const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      label,
      size = 'S',
      type = 'button',
      variant = 'tertiary',
      withTooltip = true,
      ...props
    },
    ref,
  ) => {
    // Like the legacy AccessibleIcon: the icon is hidden, a visually hidden text names the button
    const icon = React.isValidElement<React.SVGProps<SVGSVGElement>>(children)
      ? React.cloneElement(children, { 'aria-hidden': true, focusable: 'false' })
      : children;

    const button = (
      <ButtonPrimitive
        ref={ref}
        data-slot="icon-button"
        type={type}
        // The legacy IconButton stays focusable when disabled, it only sets `aria-disabled`
        disabled={disabled}
        focusableWhenDisabled
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </ButtonPrimitive>
    );

    if (!withTooltip) {
      return button;
    }

    return (
      <Tooltip>
        <TooltipTrigger delay={500} render={button} />
        <TooltipContent sideOffset={8}>{label}</TooltipContent>
      </Tooltip>
    );
  },
);

IconButton.displayName = 'IconButton';

/*
 * Joins IconButtons into one bar: the inner corners are square and the borders between them collapse
 */
const IconButtonGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="icon-button-group"
      className={cn(
        'flex',
        '*:data-[slot=icon-button]:rounded-none',
        '*:data-[slot=icon-button]:first:rounded-l-md *:data-[slot=icon-button]:last:rounded-r-md',
        '[&>[data-slot=icon-button]+[data-slot=icon-button]]:border-l-0',
        className,
      )}
      {...props}
    />
  ),
);

IconButtonGroup.displayName = 'IconButtonGroup';

export { IconButton, IconButtonGroup, iconButtonVariants };
export type { IconButtonProps };
