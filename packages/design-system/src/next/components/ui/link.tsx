import * as React from 'react';

import { cn } from '@/lib/utils';
import { useRender } from '@base-ui/react/use-render';

import { focusRingClasses, getLinkBehaviourProps, type BaseLinkProps } from './base-link';
import { Typography, textColorClass, type TextColor } from './typography';

/*
 * The ExternalLink icon of @strapi/icons, inlined: the icon package reads the styled-components theme, which a
 * page without the old provider does not have
 */
const ExternalLinkIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={16}
    height={16}
    fill="currentColor"
    aria-hidden
    focusable="false"
    data-slot="link-external-icon"
    {...props}
  >
    <path d="M28.5 13a1.5 1.5 0 1 1-3 0V8.625l-7.439 7.439a1.503 1.503 0 1 1-2.125-2.125L23.375 6.5H19a1.5 1.5 0 0 1 0-3h8A1.5 1.5 0 0 1 28.5 5zM23 16a1.5 1.5 0 0 0-1.5 1.5v8h-15v-15h8a1.5 1.5 0 1 0 0-3H6A2.5 2.5 0 0 0 3.5 10v16A2.5 2.5 0 0 0 6 28.5h16a2.5 2.5 0 0 0 2.5-2.5v-8.5A1.5 1.5 0 0 0 23 16" />
  </svg>
);

interface LinkProps extends Omit<BaseLinkProps, 'color'> {
  /**
   * The text and icon colour, as a legacy colour token. A `text-*` class in `className` does the same.
   * @default 'primary600'
   */
  color?: TextColor;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      className,
      color = 'primary600',
      disabled = false,
      endIcon,
      href,
      isExternal = false,
      render,
      startIcon,
      ...props
    },
    ref,
  ) => {
    /* It shares the attributes of BaseLink, without its `:visited` colour, which would replace the colour */
    return useRender({
      defaultTagName: 'a',
      render,
      ref,
      props: {
        'data-slot': 'link',
        ...(href !== undefined && { href }),
        ...getLinkBehaviourProps({ disabled, isExternal }),
        className: cn(
          'inline-flex cursor-pointer items-center gap-2 no-underline [&_svg_path]:fill-current',
          disabled && 'pointer-events-none',
          focusRingClasses,
          textColorClass(disabled ? 'neutral600' : color),
          className,
        ),
        children: (
          <>
            {startIcon}
            <Typography data-slot="link-label">{children}</Typography>
            {endIcon}
            {href && !endIcon && isExternal && <ExternalLinkIcon />}
          </>
        ),
        ...props,
      },
    });
  },
);

Link.displayName = 'Link';

export { Link };
export type { LinkProps };
