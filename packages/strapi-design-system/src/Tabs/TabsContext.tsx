import { createContext, useContext } from 'react';

interface TabsContext {
  id: string;
  selectedTabIndex: number;
  selectTabIndex: (index: number) => void;
  label: string;
  variant?: 'simple';
  onTabChange?: (index: number) => void;
}

export const TabsContext = createContext<TabsContext>({
  id: '',
  label: '',
  selectedTabIndex: 0,
  selectTabIndex() {},
  onTabChange() {},
});

export const useTabs = () => useContext(TabsContext);
