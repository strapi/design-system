import * as React from 'react';

import { TabsContext } from './TabsContext';
import { useId } from '../hooks/useId';

interface TabGroupProps {
  children: React.ReactNode;
  label: string;
  id?: string;
  initialSelectedTabIndex?: number;
  onTabChange?: (index: number) => void;
  variant?: 'simple';
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
