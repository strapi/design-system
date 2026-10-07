import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button as ButtonPrimitive } from '@base-ui/react/button';

import { focusRingClasses } from './base-link';
import { ButtonLoader } from './button';

interface TextButtonProps extends Omit<ButtonPrimitive.Props, 'className'> {
  className?: string;
  endIcon?: React.ReactNode;
  /**
   * Shows a spinning loader in place of the start icon and disables the TextButton.
   */
  loading?: boolean;
  startIcon?: React.ReactNode;
}

/* A button that looks like a link: primary text, no border, no background */
const TextButton = React.forwardRef<HTMLElement, TextButtonProps>(
  ({ children, className, disabled = false, endIcon, loading = false, startIcon, type = 'button', ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="text-button"
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(
          'flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-primary-600',
          'aria-disabled:pointer-events-none aria-disabled:text-neutral-600',
          focusRingClasses,
          className,
        )}
        {...props}
      >
        {loading ? (
          <span data-slot="text-button-loader" aria-hidden className="flex">
            <ButtonLoader />
          </span>
        ) : (
          startIcon
        )}
        <span data-slot="text-button-label" className="text-xs">
          {children}
        </span>
        {endIcon}
      </ButtonPrimitive>
    );
  },
);

TextButton.displayName = 'TextButton';

export { TextButton };
export type { TextButtonProps };
