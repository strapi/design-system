import * as React from 'react';

import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

/*
 * The legacy Badge: the `sigma` text style (1.1rem, semibold, uppercase) on a 200 background with 700 text. With no
 * variant, the legacy defaults `neutral150` and `neutral600` apply
 */
const badgeVariants = cva(
  'inline-flex min-w-5 shrink-0 items-center justify-center text-2xs leading-2.5 font-semibold whitespace-nowrap uppercase [&>svg]:pointer-events-none [&>svg]:size-2.5 [&>svg]:fill-current',
  {
    variants: {
      variant: {
        default: 'bg-neutral-150 text-neutral-600',
        neutral: 'bg-neutral-200 text-neutral-700',
        primary: 'bg-primary-200 text-primary-700',
        secondary: 'bg-secondary-200 text-secondary-700',
        alternative: 'bg-alternative-200 text-alternative-700',
        success: 'bg-success-200 text-success-700',
        warning: 'bg-warning-200 text-warning-700',
        danger: 'bg-danger-200 text-danger-700',
      },
      size: {
        default: 'gap-1 rounded-md px-2 py-2',
        sm: 'gap-1 rounded-xs px-1 py-1',
      },
      active: {
        true: 'bg-primary-200 text-primary-600',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      active: false,
    },
  },
);

type BadgeProps = useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

/**
 * Pass `render` to render another element, such as `render={<a href="/" />}`
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', active = false, render, ...props }, ref) =>
    useRender({
      defaultTagName: 'span',
      ref,
      render,
      state: { slot: 'badge', variant, size, active: active ?? false },
      props: mergeProps<'span'>({ className: cn(badgeVariants({ variant, size, active }), className) }, props),
    }),
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export type { BadgeProps };
