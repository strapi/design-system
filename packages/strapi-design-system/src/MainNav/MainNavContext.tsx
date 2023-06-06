import { createContext, useContext } from 'react';

export const MainNavContext = createContext(false);

export const useMainNav = () => useContext(MainNavContext);
