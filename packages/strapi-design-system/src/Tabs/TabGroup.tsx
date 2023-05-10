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

    const Tabs = React.Children.toArray(props.children).find((child) => {
      if (React.isValidElement(child)) {
        const componentType = child.type as React.ComponentType<any>;

        return componentType.displayName === 'Tabs';
      }

      return false;
    }) as React.ReactElement | undefined;

    let firstSelectedTab = initialSelectedTabIndex || 0;

    if (Tabs && initialSelectedTabIndex === undefined) {
      firstSelectedTab = Tabs.props.children.findIndex((node) => !node.props.disabled);
    }

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
