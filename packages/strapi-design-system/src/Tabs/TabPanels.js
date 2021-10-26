import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { useTabs } from './TabsContext';

export const TabPanels = ({ children, ...props }) => {
  const { id, selectedTabIndex } = useTabs();

  const childrenArray = Children.toArray(children)
    .map((node, index) => cloneElement(node, { id: `${id}-${index}` }))
    .filter((_, index) => index === selectedTabIndex);

  return <div {...props}>{childrenArray}</div>;
};

TabPanels.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TabPanel = ({ id, ...props }) => {
  const tabId = `${id}-tab`;
  const tabPanelId = `${id}-tabpanel`;

  return <div id={tabPanelId} role="tabpanel" tabIndex={0} aria-labelledby={tabId} {...props} />;
};

TabPanel.defaultProps = {
  id: undefined,
};

TabPanel.propTypes = {
  id: PropTypes.string,
};
