import * as React from 'react';

export const MainNavContext = React.createContext<boolean>(false);

export const useMainNav = () => React.useContext(MainNavContext);
