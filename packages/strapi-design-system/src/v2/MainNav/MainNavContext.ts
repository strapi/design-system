import { createContext, useContext } from 'react';

export const MainNavContext = createContext<boolean>(false);

export const useMainNav = () => useContext(MainNavContext);
