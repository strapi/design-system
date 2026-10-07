import * as React from 'react';

import { cn } from '@/lib/utils';
import { useRender } from '@base-ui/react/use-render';

/*
 * The focus ring of the legacy text links and text buttons: a 2px border drawn 5px around the element by an
 * `::after`, in place of the outline
 */
const focusRingClasses = [
  'relative outline-none focus-visible:outline-none',
  "after:pointer-events-none after:absolute after:-inset-1 after:rounded-xl after:border-2 after:border-solid after:border-transparent after:content-[''] after:transition-all after:duration-200",
  'focus-visible:after:-inset-1.5 focus-visible:after:border-primary-600',
].join(' ');

interface LinkBehaviourProps {
  /**
   * Takes the link out of the tab order, marks it `aria-disabled` and ignores the pointer.
   * @default false
   */
  disabled?: boolean;
  /**
   * Opens the link in a new tab, with `rel="noreferrer noopener"`.
   * @default false
   */
  isExternal?: boolean;
}

/*
 * The attributes that every link of the system shares (BaseLink, Link, LinkButton). An attribute that does not
 * apply is left out, not set to `undefined`, so it does not override the props of a `render` element
 */
const getLinkBehaviourProps = ({ disabled = false, isExternal = false }: LinkBehaviourProps) => ({
  ...(isExternal && { target: '_blank', rel: 'noreferrer noopener' }),
  ...(disabled && { tabIndex: -1 }),
  'aria-disabled': disabled,
});

interface BaseLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, LinkBehaviourProps {
  /**
   * Composes the link with another component, such as a router link: `render={<NavLink to="/" />}`.
   */
  render?: useRender.RenderProp;
}

const BaseLink = React.forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ className, disabled = false, isExternal = false, render, ...props }, ref) => {
    return useRender({
      defaultTagName: 'a',
      render,
      ref,
      props: {
        'data-slot': 'base-link',
        ...getLinkBehaviourProps({ disabled, isExternal }),
        className: cn(
          'no-underline visited:text-inherit',
          disabled ? 'pointer-events-none' : 'cursor-pointer',
          className,
        ),
        ...props,
      },
    });
  },
);

BaseLink.displayName = 'BaseLink';

export { BaseLink, focusRingClasses, getLinkBehaviourProps };
export type { BaseLinkProps, LinkBehaviourProps };
