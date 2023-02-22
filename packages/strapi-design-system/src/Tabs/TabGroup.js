import * as React from 'react';

import PropTypes from 'prop-types';

import { TabsContext } from './TabsContext';
import { useId } from '../helpers/useId';

export const TabGroup = React.forwardRef(
  ({ id, initialSelectedTabIndex, label, onTabChange, variant, ...props }, ref) => {
    const tabsId = useId(id);
    const Tabs = React.Children.toArray(props.children).find((node) => node.type.displayName === 'Tabs');
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

TabGroup.defaultProps = {
  id: undefined,
  initialSelectedTabIndex: undefined,
  onTabChange() {},
  variant: undefined,
};

TabGroup.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  initialSelectedTabIndex: PropTypes.number,
  label: PropTypes.string.isRequired,
  onTabChange: PropTypes.func,
  variant: PropTypes.oneOf(['simple']),
};
