import * as React from 'react';

import { VisuallyHidden } from './visually-hidden';

interface AccessibleIconProps {
  /**
   * The icon. It must be a single React element, an SVG most of the time.
   */
  children?: React.ReactNode;
  /**
   * The accessible label for the icon. This label will be visually hidden but announced to screen
   * reader users, similar to `alt` text for `img` tags.
   */
  label: string;
}

/**
 * Hides an icon from assistive technology and adds a visually hidden label next to it, so the icon
 * reads like text.
 *
 * It renders no element of its own: the child keeps its own ref.
 */
const AccessibleIcon = ({ children, label }: AccessibleIconProps) => {
  const child = React.Children.only(children) as React.ReactElement;

  return (
    <>
      {React.cloneElement(child, {
        'aria-hidden': 'true',
        // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
        focusable: 'false',
      } as React.HTMLAttributes<Element>)}
      <VisuallyHidden>{label}</VisuallyHidden>
    </>
  );
};

AccessibleIcon.displayName = 'AccessibleIcon';

export { AccessibleIcon };
export type { AccessibleIconProps };
