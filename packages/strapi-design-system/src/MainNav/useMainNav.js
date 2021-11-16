import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const MainNavContext = createContext();

export const MainNavProvider = ({ children, condensed, onCondense }) => {
  return <MainNavContext.Provider value={{ condensed, onCondense }}>{children}</MainNavContext.Provider>;
};

export const useMainNav = () => useContext(MainNavContext);

MainNavProvider.propTypes = {
  children: PropTypes.node.isRequired,
  condensed: PropTypes.bool.isRequired,
  onCondense: PropTypes.func.isRequired,
};
