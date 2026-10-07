'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { CaretDown } from '@strapi/icons';

type AccordionSize = 'sm' | 'md';

const AccordionContext = React.createContext<{ size: AccordionSize }>({ size: 'sm' });

const useAccordionSize = () => React.useContext(AccordionContext).size;

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface AccordionProps extends AccordionPrimitive.Root.Props {
  /**
   * `sm` draws a bordered box with a line between the items, `md` has bigger paddings, no border and
   * shows the `description` of the triggers.
   * @default 'sm'
   */
  size?: AccordionSize;
}

/**
 * The accordion. One item opens at a time unless `multiple` is set, and an open item closes when its
 * trigger is clicked again. `value`, `defaultValue` and `onValueChange` use arrays of item values.
 */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({ className, size = 'sm', ...props }, ref) => {
  const contextValue = React.useMemo(() => ({ size }), [size]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <AccordionPrimitive.Root
        ref={ref}
        data-slot="accordion"
        data-size={size}
        className={cn(
          'bg-neutral-0 data-[size=sm]:rounded-md data-[size=sm]:border data-[size=sm]:border-neutral-200',
          className,
        )}
        {...props}
      />
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionPrimitive.Item.Props>(
  ({ className, ...props }, ref) => {
    const size = useAccordionSize();

    return (
      <AccordionPrimitive.Item
        ref={ref}
        data-slot="accordion-item"
        data-size={size}
        className={cn(
          'my-px overflow-hidden first:mt-0 first:rounded-t-sm last:mb-0 last:rounded-b-sm',
          'data-[size=sm]:not-first:border-t data-[size=sm]:not-first:border-neutral-200',
          'focus-within:relative focus-within:z-1 focus-within:ring-1 data-open:ring-1 not-data-disabled:hover:ring-1 ring-primary-600',
          'motion-safe:transition-shadow motion-safe:duration-120 motion-safe:ease-out',
          className,
        )}
        {...props}
      />
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

interface AccordionHeaderProps extends AccordionPrimitive.Header.Props {
  /**
   * `secondary` has a `neutral100` background.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
}

/**
 * The `<h3>` that holds the `AccordionTrigger` and the `AccordionActions`.
 */
const AccordionHeader = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <AccordionPrimitive.Header
        ref={ref}
        data-slot="accordion-header"
        data-variant={variant}
        className={cn(
          'group/accordion-header m-0 flex items-center bg-neutral-0 data-[variant=secondary]:bg-neutral-100 data-disabled:bg-neutral-150',
          'not-data-disabled:hover:bg-primary-100 not-data-disabled:data-open:bg-primary-100',
          'motion-safe:transition-colors motion-safe:duration-120 motion-safe:ease-out',
          className,
        )}
        {...props}
      />
    );
  },
);

AccordionHeader.displayName = 'AccordionHeader';

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

interface AccordionTriggerProps extends AccordionPrimitive.Trigger.Props {
  /**
   * The side of the caret.
   * @default 'left'
   */
  caretPosition?: 'left' | 'right';
  /**
   * A line of text under the label. Shown in the `md` size only.
   */
  description?: React.ReactNode;
  /**
   * An icon before the label. Shown in the `sm` size only.
   */
  icon?: React.ElementType<React.SVGProps<SVGSVGElement>>;
  iconProps?: React.SVGProps<SVGSVGElement>;
}

const AccordionCaret = ({ size }: { size: AccordionSize }) => (
  <span
    data-slot="accordion-caret"
    aria-hidden
    className={cn(
      'flex shrink-0 items-center justify-center rounded-full bg-neutral-200',
      size === 'sm' ? 'size-6 [&_svg]:size-3' : 'size-8 [&_svg]:size-4',
      'group-data-panel-open/accordion-trigger:rotate-180 group-not-data-disabled/accordion-trigger:group-hover/accordion-header:bg-primary-200 group-not-data-disabled/accordion-trigger:group-data-panel-open/accordion-trigger:bg-primary-200',
      'motion-safe:transition motion-safe:duration-200 motion-safe:ease-in-out',
    )}
  >
    <CaretDown />
  </span>
);

/**
 * The button that opens and closes the item.
 */
const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, caretPosition = 'left', children, description, icon: Icon, iconProps, ...props }, ref) => {
    const size = useAccordionSize();

    return (
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        data-size={size}
        className={cn(
          'group/accordion-trigger flex w-full cursor-pointer items-center gap-4 overflow-hidden border-none bg-transparent text-left text-neutral-800 focus-visible:outline-none',
          caretPosition === 'left' ? 'justify-start' : 'justify-between',
          size === 'sm' ? 'px-4 py-3' : 'p-6',
          'data-disabled:cursor-default data-disabled:text-neutral-600',
          'not-data-disabled:group-hover/accordion-header:text-primary-600 not-data-disabled:data-panel-open:text-primary-600',
          'motion-safe:transition-colors motion-safe:duration-120 motion-safe:ease-out',
          className,
        )}
        {...props}
      >
        {caretPosition === 'left' ? <AccordionCaret size={size} /> : null}
        <span className="flex gap-2 overflow-hidden">
          {Icon && size === 'sm' ? (
            <span
              data-slot="accordion-trigger-icon"
              className="flex text-neutral-500 group-not-data-disabled/accordion-trigger:group-hover/accordion-header:text-primary-600 group-not-data-disabled/accordion-trigger:group-data-panel-open/accordion-trigger:text-primary-600 motion-safe:transition-colors motion-safe:duration-120"
            >
              <Icon {...iconProps} />
            </span>
          ) : null}
          <span className="flex flex-col items-start overflow-hidden">
            <span
              className={cn(
                'block w-full truncate text-left',
                size === 'sm'
                  ? 'text-base font-semibold medium:text-sm'
                  : 'text-lg leading-snug font-medium medium:text-base medium:leading-tight',
              )}
            >
              {children}
            </span>
            {description && size === 'md' ? (
              <span data-slot="accordion-trigger-description" className="text-left text-base medium:text-sm">
                {description}
              </span>
            ) : null}
          </span>
        </span>
        {caretPosition === 'right' ? <AccordionCaret size={size} /> : null}
      </AccordionPrimitive.Trigger>
    );
  },
);

AccordionTrigger.displayName = 'AccordionTrigger';

/* -------------------------------------------------------------------------------------------------
 * Actions
 * -----------------------------------------------------------------------------------------------*/

/**
 * Buttons next to the trigger, inside the header. Clicking them does not toggle the item. Their buttons
 * lose the background and the border, and take the colour of the header.
 */
const AccordionActions = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    const size = useAccordionSize();

    return (
      <span
        ref={ref}
        data-slot="accordion-actions"
        className={cn(
          'flex',
          size === 'sm' ? 'p-2' : 'p-6',
          '[&>button]:border-none [&>button]:bg-transparent [&>button]:text-neutral-600 motion-safe:[&>button]:transition-colors motion-safe:[&>button]:duration-120',
          'group-not-data-disabled/accordion-header:group-hover/accordion-header:[&>button]:text-primary-600 group-not-data-disabled/accordion-header:group-data-open/accordion-header:[&>button]:text-primary-600',
          className,
        )}
        {...props}
      />
    );
  },
);

AccordionActions.displayName = 'AccordionActions';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

/**
 * The panel of the item, a `region` named by its trigger. It slides open and closed.
 */
const AccordionContent = React.forwardRef<HTMLDivElement, AccordionPrimitive.Panel.Props>(
  ({ className, ...props }, ref) => {
    return (
      <AccordionPrimitive.Panel
        ref={ref}
        data-slot="accordion-content"
        className={cn(
          'h-(--accordion-panel-height) overflow-hidden data-ending-style:h-0 data-starting-style:h-0',
          'motion-safe:transition-[height] motion-safe:duration-320 motion-safe:ease-in-out',
          className,
        )}
        {...props}
      />
    );
  },
);

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionActions, AccordionContent };
export type { AccordionProps, AccordionHeaderProps, AccordionTriggerProps, AccordionSize };
