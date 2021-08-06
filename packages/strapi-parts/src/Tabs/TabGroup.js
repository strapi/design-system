import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from './TabsContext';
import { useId } from '../helpers/useId';

export const TabGroup = ({ id, label, variant, ...props }) => {
  const tabsId = useId('tabgroup', id);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <TabsContext.Provider value={{ id: tabsId, selectedTabIndex, selectTabIndex: setSelectedTabIndex, label, variant }}>
      <div {...props} />
    </TabsContext.Provider>
  );
};

TabGroup.defaultProps = {
  id: undefined,
  variant: undefined,
};

TabGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['simple']),
};
