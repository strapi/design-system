import * as React from 'react';

import { TabsContext, type TabsContextState } from './TabsContext';
import { useId } from '../hooks/useId';

export interface TabGroupProps
  extends Omit<TabsContextState, 'id' | 'selectedTabIndex' | 'selectTabIndex'>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  initialSelectedTabIndex?: number;
}

export type SetSelectedTabIndexHandler = (tabIndex: number) => void;

export const TabGroup = React.forwardRef<
  { _handlers: { setSelectedTabIndex: SetSelectedTabIndexHandler } },
  TabGroupProps
>(({ id, initialSelectedTabIndex = 0, label, onTabChange, variant, ...props }, ref) => {
  const tabsId = useId(id);

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(initialSelectedTabIndex);

  React.useImperativeHandle(ref, () => ({
    _handlers: { setSelectedTabIndex },
  }));

  const context = React.useMemo(
    () => ({ id: tabsId, selectedTabIndex, selectTabIndex: setSelectedTabIndex, label, variant, onTabChange }),
    [label, onTabChange, selectedTabIndex, tabsId, variant],
  );

  return (
    <TabsContext.Provider value={context}>
      <div {...props} />
    </TabsContext.Provider>
  );
});

TabGroup.displayName = 'TabGroup';
