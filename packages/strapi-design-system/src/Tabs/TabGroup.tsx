import * as React from 'react';

import { TabsContext, type TabsContextState } from './TabsContext';
import { useControllableState } from '../hooks/useControllableState';
import { useId } from '../hooks/useId';

export interface TabGroupProps
  extends Omit<TabsContextState, 'id' | 'selectedTabIndex' | 'selectTabIndex'>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  selectedTabIndex?: number;
  initialSelectedTabIndex?: number;
}

export type SetSelectedTabIndexHandler = (tabIndex: number) => void;

export const TabGroup = React.forwardRef<
  { _handlers: { setSelectedTabIndex: SetSelectedTabIndexHandler } },
  TabGroupProps
>(
  (
    { id, initialSelectedTabIndex, label, onTabChange, selectedTabIndex: selectedTabIndexProp, variant, ...props },
    ref,
  ) => {
    const tabsId = useId(id);

    const [selectedTabIndex = 0, setSelectedTabIndex] = useControllableState({
      prop: selectedTabIndexProp,
      defaultProp: initialSelectedTabIndex,
      // @ts-expect-error
      onChange: onTabChange,
    });

    React.useImperativeHandle(ref, () => ({
      _handlers: { setSelectedTabIndex },
    }));

    const context = React.useMemo(
      () => ({ id: tabsId, selectedTabIndex, selectTabIndex: setSelectedTabIndex, label, variant, onTabChange }),
      [label, onTabChange, selectedTabIndex, tabsId, variant, setSelectedTabIndex],
    );

    return (
      <TabsContext.Provider value={context}>
        <div {...props} />
      </TabsContext.Provider>
    );
  },
);

TabGroup.displayName = 'TabGroup';
