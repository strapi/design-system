import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from './TabsContext';
import { genId } from '../helpers/genId';

export const TabGroup = ({ id, label, ...props }) => {
  const tabsId = useRef(id || genId());
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <TabsContext.Provider value={{ id: tabsId.current, selectedTabIndex, selectTabIndex: setSelectedTabIndex, label }}>
      <div {...props} />
    </TabsContext.Provider>
  );
};

TabGroup.defaultProps = {
  id: undefined,
};

TabGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};
