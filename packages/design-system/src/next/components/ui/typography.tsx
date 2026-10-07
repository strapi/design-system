import * as React from 'react';

import { cn } from '@/lib/utils';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

/*
 * The legacy text variants on the stock Tailwind sizes, with their stock line heights. `medium:` holds the
 * tablet and desktop value, like the old `theme.breakpoints.medium` query
 */
const typographyVariants = cva('', {
  variants: {
    variant: {
      alpha: 'text-3xl font-semibold',
      beta: 'text-xl font-semibold medium:text-lg',
      delta: 'text-lg font-medium medium:text-base medium:leading-tight',
      epsilon: 'text-lg medium:text-base',
      omega: 'text-base medium:text-sm',
      pi: 'text-xs',
      sigma: 'text-2xs font-semibold uppercase',
    },
    /* The legacy `fontWeights`: regular 400, semiBold 500, bold 600 */
    fontWeight: {
      regular: 'font-normal',
      semiBold: 'font-medium',
      bold: 'font-semibold',
    },
    ellipsis: {
      true: 'block truncate',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'omega',
  },
});

/*
 * One class per legacy colour token, so `textColor="neutral600"` keeps working. Tailwind only emits
 * a class it finds in the source, so every class is written in full here
 */
const TEXT_COLOR_CLASSES = {
  currentcolor: 'text-current',
  inherit: 'text-inherit',
  alternative100: 'text-alternative-100',
  alternative200: 'text-alternative-200',
  alternative500: 'text-alternative-500',
  alternative600: 'text-alternative-600',
  alternative700: 'text-alternative-700',
  buttonNeutral0: 'text-button-neutral-0',
  buttonPrimary500: 'text-button-primary-500',
  buttonPrimary600: 'text-button-primary-600',
  danger100: 'text-danger-100',
  danger200: 'text-danger-200',
  danger500: 'text-danger-500',
  danger600: 'text-danger-600',
  danger700: 'text-danger-700',
  neutral0: 'text-neutral-0',
  neutral100: 'text-neutral-100',
  neutral150: 'text-neutral-150',
  neutral200: 'text-neutral-200',
  neutral300: 'text-neutral-300',
  neutral400: 'text-neutral-400',
  neutral500: 'text-neutral-500',
  neutral600: 'text-neutral-600',
  neutral700: 'text-neutral-700',
  neutral800: 'text-neutral-800',
  neutral900: 'text-neutral-900',
  neutral1000: 'text-neutral-1000',
  primary100: 'text-primary-100',
  primary200: 'text-primary-200',
  primary500: 'text-primary-500',
  primary600: 'text-primary-600',
  primary700: 'text-primary-700',
  secondary100: 'text-secondary-100',
  secondary200: 'text-secondary-200',
  secondary500: 'text-secondary-500',
  secondary600: 'text-secondary-600',
  secondary700: 'text-secondary-700',
  success100: 'text-success-100',
  success200: 'text-success-200',
  success500: 'text-success-500',
  success600: 'text-success-600',
  success700: 'text-success-700',
  warning100: 'text-warning-100',
  warning200: 'text-warning-200',
  warning500: 'text-warning-500',
  warning600: 'text-warning-600',
  warning700: 'text-warning-700',
} as const;

type TextColor = keyof typeof TEXT_COLOR_CLASSES;

/** The text colour class of a legacy colour token, e.g. `neutral600` → `text-neutral-600` */
const textColorClass = (color: TextColor | undefined): string | undefined =>
  color ? TEXT_COLOR_CLASSES[color] : undefined;

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;
type TypographyFontWeight = NonNullable<VariantProps<typeof typographyVariants>['fontWeight']>;

/**
 * A base `leading-*` in `className` sets the line height at every breakpoint, like the legacy `lineHeight` prop.
 * tailwind-merge keeps the `medium:leading-*` of the variant (another breakpoint), which would win from `medium`
 * up, so it is dropped here
 */
const variantClasses = (classes: string, className: string | undefined): string =>
  className && /(?:^|\s)leading-\S/.test(className)
    ? classes
        .split(' ')
        .filter((value) => !/^(?:small|medium|large):leading-/.test(value))
        .join(' ')
    : classes;

interface TypographyProps extends Omit<React.AllHTMLAttributes<HTMLElement>, 'color'> {
  /**
   * The text style of the old system.
   * @default 'omega'
   */
  variant?: TypographyVariant;
  /**
   * A legacy colour token. A `text-*` class in `className` does the same.
   * @default 'currentcolor'
   */
  textColor?: TextColor;
  /**
   * The weight of the old system. It overrides the weight of the variant.
   */
  fontWeight?: TypographyFontWeight;
  /**
   * Cuts the text to one line with an ellipsis. It makes the element a block.
   */
  ellipsis?: boolean;
  /**
   * The HTML element to render, e.g. `p`, `h1` or `label`.
   * @default 'span'
   */
  tag?: keyof React.JSX.IntrinsicElements;
  /**
   * Replaces the element with another one, or composes it with a component such as a router link,
   * e.g. `render={<NavLink to="/" />}`. It takes precedence over `tag`.
   */
  render?: useRender.RenderProp;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'omega',
      textColor = 'currentcolor',
      fontWeight,
      ellipsis = false,
      tag = 'span',
      render,
      ...props
    },
    ref,
  ) => {
    return useRender({
      defaultTagName: tag,
      render,
      ref,
      props: {
        'data-slot': 'typography',
        className: cn(
          variantClasses(typographyVariants({ variant, fontWeight, ellipsis }), className),
          textColorClass(textColor),
          className,
        ),
        ...props,
      },
    });
  },
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants, textColorClass, TEXT_COLOR_CLASSES };
export type { TypographyProps, TypographyVariant, TypographyFontWeight, TextColor };
