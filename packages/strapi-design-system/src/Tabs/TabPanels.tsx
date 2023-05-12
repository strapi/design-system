import React, { Children, cloneElement } from 'react';

import { useTabs } from './TabsContext';

export interface TabPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabPanels = ({ children, ...props }: TabPanelsProps) => {
  const { id, selectedTabIndex } = useTabs();

  const childrenArray = Children.toArray(children)
    .map((node, index) => cloneElement(node as React.ReactElement, { id: `${id}-${index}` }))
    .filter((_, index) => index === selectedTabIndex);

  return <div {...props}>{childrenArray}</div>;
};

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
}

export const TabPanel = ({ id, ...props }: TabPanelProps) => {
  const tabId = `${id}-tab`;
  const tabPanelId = `${id}-tabpanel`;

  return <div id={tabPanelId} role="tabpanel" tabIndex={0} aria-labelledby={tabId} {...props} />;
};
