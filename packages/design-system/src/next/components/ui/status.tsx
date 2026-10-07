import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

/*
 * The legacy Status: a 100 background, a 1px 200 border and 600 text
 */
const statusVariants = cva('rounded-md border border-solid', {
  variants: {
    variant: {
      primary: 'border-primary-200 bg-primary-100 text-primary-600',
      secondary: 'border-secondary-200 bg-secondary-100 text-secondary-600',
      alternative: 'border-alternative-200 bg-alternative-100 text-alternative-600',
      neutral: 'border-neutral-200 bg-neutral-100 text-neutral-600',
      success: 'border-success-200 bg-success-100 text-success-600',
      warning: 'border-warning-200 bg-warning-100 text-warning-600',
      danger: 'border-danger-200 bg-danger-100 text-danger-600',
    },
    size: {
      default: 'px-5 py-4',
      sm: 'px-2 py-1',
      xs: 'px-1.5 py-0.5',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

type StatusProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof statusVariants>;

/**
 * A visual indication on a page, such as "Published". It is not interactive
 */
const Status = React.forwardRef<HTMLDivElement, StatusProps>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="status"
    data-variant={variant ?? 'primary'}
    className={cn(statusVariants({ variant, size }), className)}
    {...props}
  />
));

Status.displayName = 'Status';

export { Status, statusVariants };
export type { StatusProps };
