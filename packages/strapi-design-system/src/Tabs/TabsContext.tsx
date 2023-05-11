import { createContext, useContext } from 'react';

export interface TabsContextState {
  id: string;
  selectedTabIndex: number;
  selectTabIndex: (index: number) => void;
  label: string;
  variant?: 'simple';
  onTabChange?: (index: number) => void;
}

export const TabsContext = createContext<TabsContextState>({
  id: '',
  label: '',
  selectedTabIndex: 0,
  selectTabIndex() {},
  onTabChange() {},
});

export const useTabs = () => useContext(TabsContext);
