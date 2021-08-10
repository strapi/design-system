import React from 'react';
import PropTypes from 'prop-types';

export const Main = ({ labelledBy, ...props }) => {
  return <main aria-labelledby={labelledBy} id="main-content" tabIndex={-1} {...props} />;
};

Main.propTypes = {
  labelledBy: PropTypes.string.isRequired,
};
