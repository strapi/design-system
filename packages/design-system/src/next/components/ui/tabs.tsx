'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

type TabsVariant = 'regular' | 'simple';

interface TabsContextValue {
  disabled: boolean | TabsPrimitive.Tab.Value;
  hasError?: TabsPrimitive.Tab.Value;
  variant: TabsVariant;
}

const TabsContext = React.createContext<TabsContextValue>({ disabled: false, variant: 'regular' });

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface TabsProps extends TabsPrimitive.Root.Props {
  /**
   * `true` disables every tab. A tab value disables that tab only. A `TabsTrigger` can also take `disabled`.
   * @default false
   */
  disabled?: boolean | TabsPrimitive.Tab.Value;
  /**
   * The value of the tab that shows the error colour.
   */
  hasError?: TabsPrimitive.Tab.Value;
  /**
   * `regular` draws folder tabs on a `neutral100` strip, `simple` draws uppercase labels with an underline.
   * @default 'regular'
   */
  variant?: TabsVariant;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, disabled = false, hasError, variant = 'regular', ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ disabled, hasError, variant }), [disabled, hasError, variant]);

    return (
      <TabsContext.Provider value={contextValue}>
        <TabsPrimitive.Root
          ref={ref}
          data-slot="tabs"
          data-variant={variant}
          className={cn('relative w-full', className)}
          {...props}
        />
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

/* -------------------------------------------------------------------------------------------------
 * List
 * -----------------------------------------------------------------------------------------------*/

/**
 * The `tablist`. Like the legacy Tabs, moving the focus with the arrow keys also selects the tab
 * (`activateOnFocus`).
 */
const TabsList = React.forwardRef<HTMLDivElement, TabsPrimitive.List.Props>(
  ({ className, activateOnFocus = true, ...props }, ref) => {
    const { variant } = React.useContext(TabsContext);

    return (
      <TabsPrimitive.List
        ref={ref}
        data-slot="tabs-list"
        data-variant={variant}
        activateOnFocus={activateOnFocus}
        className={cn('relative z-0 flex', variant === 'regular' ? 'items-end' : 'items-stretch', className)}
        {...props}
      />
    );
  },
);

TabsList.displayName = 'TabsList';

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsPrimitive.Tab.Props>(
  ({ className, children, disabled: disabledProp, value, ...props }, ref) => {
    const { disabled: disabledContext, hasError, variant } = React.useContext(TabsContext);

    const isDisabled =
      disabledContext === true || (disabledContext !== false && disabledContext === value) || disabledProp;
    const isErrored = hasError !== undefined && hasError === value;

    return (
      <TabsPrimitive.Tab
        ref={ref}
        data-slot="tabs-trigger"
        data-variant={variant}
        data-error={isErrored ? '' : undefined}
        value={value}
        disabled={isDisabled}
        className={cn(
          'group/tabs-trigger relative z-0 cursor-pointer border-0 bg-transparent text-neutral-600 data-error:text-danger-600',
          variant === 'simple'
            ? 'p-4 data-active:text-primary-700'
            : [
                'flex-1 border-b border-neutral-150 bg-neutral-100 p-3',
                'not-data-active:[[data-slot=tabs-trigger]:not([data-active])+&]:border-l',
                'data-active:z-1 data-active:rounded-t-md data-active:border-b-neutral-0 data-active:bg-neutral-0 data-active:p-4 data-active:text-primary-700 data-active:shadow-table',
              ],
          'data-active:data-error:text-danger-600',
          'data-disabled:cursor-not-allowed data-disabled:text-neutral-400',
          className,
        )}
        {...props}
      >
        <span
          className={
            variant === 'simple'
              ? 'text-2xs leading-3 font-semibold uppercase'
              : 'text-base font-semibold medium:text-sm'
          }
        >
          {children}
        </span>
        {variant === 'simple' ? (
          <span
            data-slot="tabs-bar"
            aria-hidden
            className="absolute bottom-0 left-0 block h-0.5 w-full bg-current opacity-0 group-data-active/tabs-trigger:opacity-100"
          />
        ) : null}
      </TabsPrimitive.Tab>
    );
  },
);

TabsTrigger.displayName = 'TabsTrigger';

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

const TabsContent = React.forwardRef<HTMLDivElement, TabsPrimitive.Panel.Props>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Panel
      ref={ref}
      data-slot="tabs-content"
      className={cn(variant === 'regular' && 'relative z-1 bg-neutral-0', className)}
      {...props}
    />
  );
});

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type { TabsProps, TabsVariant };
