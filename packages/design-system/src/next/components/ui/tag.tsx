import * as React from 'react';

import { cn } from '@/lib/utils';
import { Cross } from '@strapi/icons';

interface TagProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onClick'> {
  /**
   * The icon of the button after the label
   * @default <Cross />
   */
  icon?: React.ReactNode;
  /**
   * The accessible name of the button, such as "Remove French"
   */
  label?: string;
  /**
   * Disables the button and greys the Tag out
   * @default false
   */
  disabled?: boolean;
  /**
   * Called when the button is clicked, and never while the Tag is disabled
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * A label with a button, usually to remove a selected value
 */
const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ children, icon = <Cross />, label, disabled = false, onClick, className, ...props }, ref) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (disabled || !onClick) return;

      onClick(event);
    };

    return (
      <div
        ref={ref}
        data-slot="tag"
        data-disabled={disabled ? '' : undefined}
        className={cn(
          'inline-flex h-8 items-center rounded-md border border-solid border-primary-200 bg-primary-100 pr-1 pl-3 text-primary-600',
          'data-disabled:border-neutral-300 data-disabled:bg-neutral-200 data-disabled:text-neutral-700',
          className,
        )}
        {...props}
      >
        <span
          data-slot="tag-label"
          className="border-0 border-r border-solid border-primary-200 pr-2 text-xs font-semibold text-inherit in-data-disabled:border-neutral-300"
        >
          {children}
        </span>
        <button
          type="button"
          data-slot="tag-button"
          disabled={disabled}
          aria-disabled={disabled}
          aria-label={label}
          onClick={handleClick}
          className={cn(
            'inline-flex cursor-default border-0 bg-transparent p-2 text-primary-600 disabled:text-neutral-600 [&>svg]:size-3 [&>svg]:fill-current [&>svg_path]:fill-current',
            onClick && !disabled && 'cursor-pointer',
          )}
        >
          {icon}
        </button>
      </div>
    );
  },
);

Tag.displayName = 'Tag';

export { Tag };
export type { TagProps };
