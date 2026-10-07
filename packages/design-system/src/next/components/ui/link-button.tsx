import * as React from 'react';

import { cn } from '@/lib/utils';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps } from 'class-variance-authority';

import { getLinkBehaviourProps, type LinkBehaviourProps } from './base-link';
import { ButtonContent, buttonVariants, type ButtonContentProps } from './button';

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>,
    LinkBehaviourProps,
    Omit<ButtonContentProps, 'size'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  /**
   * Composes the link with another component, such as a router link: `render={<NavLink to="/" />}`.
   */
  render?: useRender.RenderProp;
}

/*
 * A link that looks like a Button. It shares the attributes of BaseLink, without its `:visited` colour, which
 * would replace the colour of the variant
 */
const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      endIcon,
      fullWidth = false,
      isExternal = false,
      loading = false,
      render,
      size = 'S',
      startIcon,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return useRender({
      defaultTagName: 'a',
      render,
      ref,
      props: {
        'data-slot': 'link-button',
        ...getLinkBehaviourProps({ disabled: isDisabled, isExternal }),
        className: cn(buttonVariants({ variant, size, fullWidth }), isDisabled && 'pointer-events-none', className),
        children: (
          <ButtonContent size={size ?? 'M'} loading={loading} startIcon={startIcon} endIcon={endIcon}>
            {children}
          </ButtonContent>
        ),
        ...props,
      },
    });
  },
);

LinkButton.displayName = 'LinkButton';

export { LinkButton };
export type { LinkButtonProps };
