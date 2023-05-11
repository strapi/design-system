import * as React from 'react';

import { TabsContext, type TabsContextState } from './TabsContext';
import { useId } from '../hooks/useId';

interface TabGroupProps extends Omit<TabsContextState, 'id'>, React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  initialSelectedTabIndex?: number;
}

export const TabGroup = React.forwardRef(
  ({ id, initialSelectedTabIndex, label, onTabChange = () => {}, variant, ...props }: TabGroupProps, ref) => {
    const tabsId = useId(id);

    let firstSelectedTab = initialSelectedTabIndex || 0;
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(firstSelectedTab === -1 ? 0 : firstSelectedTab);

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
  },
);

TabGroup.displayName = 'TabGroup';
