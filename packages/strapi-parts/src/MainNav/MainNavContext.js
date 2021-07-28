import { createContext, useContext } from 'react';

export const MainNavContext = createContext();

export const useMainNav = () => useContext(MainNavContext);
