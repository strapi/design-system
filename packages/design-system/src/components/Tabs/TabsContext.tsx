import * as React from 'react';

export interface TabsContextState {
  id: string;
  selectedTabIndex: number;
  label: string;
  variant?: 'simple';
  onTabChange?: (index: number) => void;
  selectTabIndex: (index: number) => void;
}

export const TabsContext = React.createContext<TabsContextState>({
  id: '',
  label: '',
  selectedTabIndex: 0,
  selectTabIndex() {
    throw new Error('TabsContext.selectTabIndex is not implemented.');
  },
});

export const useTabs = () => React.useContext(TabsContext);
