import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

/*
 * The colours of each legacy variant, shared with IconButton and LinkButton. Hover and active skip a disabled
 * element, like the old styles did
 */
const BUTTON_VARIANT_CLASSES = {
  default: [
    'border-button-primary-600 bg-button-primary-600 text-button-neutral-0',
    'hover:not-aria-disabled:border-button-primary-500 hover:not-aria-disabled:bg-button-primary-500',
    'active:not-aria-disabled:border-primary-600 active:not-aria-disabled:bg-primary-600',
  ],
  secondary: [
    'border-primary-200 bg-primary-100 text-primary-700',
    'hover:not-aria-disabled:bg-neutral-0',
    'active:not-aria-disabled:border-primary-600 active:not-aria-disabled:bg-neutral-0 active:not-aria-disabled:text-primary-600',
  ],
  tertiary: [
    'border-neutral-200 bg-neutral-0 text-neutral-800',
    'hover:not-aria-disabled:bg-neutral-100',
    'active:not-aria-disabled:bg-neutral-150',
  ],
  success: [
    'border-success-600 bg-success-600 text-neutral-0',
    'hover:not-aria-disabled:border-success-500 hover:not-aria-disabled:bg-success-500',
    'active:not-aria-disabled:border-success-600 active:not-aria-disabled:bg-success-600',
  ],
  'success-light': [
    'border-success-200 bg-success-100 text-success-700',
    'hover:not-aria-disabled:bg-neutral-0',
    'active:not-aria-disabled:border-success-600 active:not-aria-disabled:bg-neutral-0 active:not-aria-disabled:text-success-600',
  ],
  danger: [
    'border-danger-600 bg-danger-600 text-neutral-0',
    'hover:not-aria-disabled:border-danger-500 hover:not-aria-disabled:bg-danger-500',
    'active:not-aria-disabled:border-danger-600 active:not-aria-disabled:bg-danger-600',
  ],
  'danger-light': [
    'border-danger-200 bg-danger-100 text-danger-700',
    'hover:not-aria-disabled:bg-neutral-0',
    'active:not-aria-disabled:border-danger-600 active:not-aria-disabled:bg-neutral-0 active:not-aria-disabled:text-danger-600',
  ],
  ghost: [
    'border-transparent bg-transparent text-neutral-800 [&_svg]:fill-neutral-500',
    'hover:not-aria-disabled:bg-neutral-100',
    'active:not-aria-disabled:bg-neutral-150',
  ],
} satisfies Record<string, string[]>;

/*
 * The look of the legacy Button. `aria-disabled` drives the disabled look, so a link that looks like a
 * Button (see LinkButton) gets it too
 */
const buttonVariants = cva(
  [
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-solid px-4 py-0 no-underline select-none',
    'motion-safe:transition-colors motion-safe:duration-120 motion-safe:ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-primary-600',
    'aria-disabled:cursor-default aria-disabled:border-neutral-200 aria-disabled:bg-neutral-150 aria-disabled:text-neutral-600',
  ],
  {
    variants: {
      variant: BUTTON_VARIANT_CLASSES,
      /* The legacy `theme.sizes.button`: a taller Button on touch screens, a smaller one from `medium` */
      size: {
        S: 'h-10 medium:h-8',
        M: 'h-11 medium:h-9',
        L: 'h-12 medium:h-10',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'S',
      fullWidth: false,
    },
  },
);

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

/* The label of the legacy Button: bold `pi` text for `S`, bold `omega` text for the other sizes */
const buttonLabelVariants = cva('font-semibold', {
  variants: {
    size: {
      S: 'text-xs',
      M: 'text-base medium:text-sm',
      L: 'text-base medium:text-sm',
    },
  },
  defaultVariants: {
    size: 'S',
  },
});

/*
 * The Loader icon of @strapi/icons, inlined: the icon package reads the styled-components theme, which a
 * page without the old provider does not have
 */
const ButtonLoader = React.forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<'svg'>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={16}
      height={16}
      fill="currentColor"
      data-slot="button-loader"
      aria-hidden
      focusable="false"
      className={cn('animate-spin [animation-duration:2s]', className)}
      {...props}
    >
      <path d="M17.5 4v4a1.5 1.5 0 1 1-3 0V4a1.5 1.5 0 1 1 3 0m4.156 7.844a1.5 1.5 0 0 0 1.062-.44l2.828-2.829a1.503 1.503 0 1 0-2.125-2.125l-2.825 2.833a1.5 1.5 0 0 0 1.06 2.56M28 14.5h-4a1.5 1.5 0 1 0 0 3h4a1.5 1.5 0 1 0 0-3m-5.282 6.096a1.501 1.501 0 0 0-2.451 1.638c.075.182.186.348.326.487l2.828 2.829a1.503 1.503 0 0 0 2.125-2.125zM16 22.5a1.5 1.5 0 0 0-1.5 1.5v4a1.5 1.5 0 1 0 3 0v-4a1.5 1.5 0 0 0-1.5-1.5m-6.717-1.904-2.83 2.829A1.503 1.503 0 0 0 8.58 25.55l2.829-2.829a1.503 1.503 0 0 0-2.125-2.125M9.5 16A1.5 1.5 0 0 0 8 14.5H4a1.5 1.5 0 1 0 0 3h4A1.5 1.5 0 0 0 9.5 16m-.925-9.546A1.503 1.503 0 0 0 6.45 8.579l2.833 2.825a1.503 1.503 0 0 0 2.125-2.125z" />
    </svg>
  ),
);
ButtonLoader.displayName = 'ButtonLoader';

interface ButtonContentProps {
  children?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
}

/* The inside of a Button and of a LinkButton. The icons stay out of the accessible name, like before */
const ButtonContent = ({ children, endIcon, loading = false, size = 'S', startIcon }: ButtonContentProps) => (
  <>
    {(startIcon || loading) && (
      <span data-slot="button-start-icon" aria-hidden className="flex">
        {loading ? <ButtonLoader /> : startIcon}
      </span>
    )}
    <span data-slot="button-label" className={buttonLabelVariants({ size })}>
      {children}
    </span>
    {endIcon && (
      <span data-slot="button-end-icon" aria-hidden className="flex">
        {endIcon}
      </span>
    )}
  </>
);

interface ButtonProps
  extends Omit<ButtonPrimitive.Props, 'className'>,
    Omit<ButtonContentProps, 'size'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      endIcon,
      fullWidth = false,
      loading = false,
      size = 'S',
      startIcon,
      type = 'button',
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        <ButtonContent size={size ?? 'M'} loading={loading} startIcon={startIcon} endIcon={endIcon}>
          {children}
        </ButtonContent>
      </ButtonPrimitive>
    );
  },
);

Button.displayName = 'Button';

export { Button, ButtonContent, ButtonLoader, buttonVariants, buttonLabelVariants, BUTTON_VARIANT_CLASSES };
export type { ButtonProps, ButtonContentProps, ButtonVariant, ButtonSize };
