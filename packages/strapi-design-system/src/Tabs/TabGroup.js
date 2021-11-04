import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from './TabsContext';
import { useId } from '../helpers/useId';

export const TabGroup = ({ id, initialSelectedTabIndex, label, onTabChange, variant, ...props }) => {
  const tabsId = useId('tabgroup', id);
  const Tabs = Children.toArray(props.children).find((node) => node.type.displayName === 'Tabs');
  let firstSelectedTab = initialSelectedTabIndex || 0;

  if (Tabs && initialSelectedTabIndex === undefined) {
    firstSelectedTab = Tabs.props.children.findIndex((node) => !node.props.disabled);
  }
  const [selectedTabIndex, setSelectedTabIndex] = useState(firstSelectedTab === -1 ? 0 : firstSelectedTab);

  return (
    <TabsContext.Provider
      value={{ id: tabsId, selectedTabIndex, selectTabIndex: setSelectedTabIndex, label, variant, onTabChange }}
    >
      <div {...props} />
    </TabsContext.Provider>
  );
};

TabGroup.defaultProps = {
  id: undefined,
  initialSelectedTabIndex: undefined,
  onTabChange: () => {},
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
