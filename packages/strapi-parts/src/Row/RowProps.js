import React from 'react';
import PropTypes from 'prop-types';

export const RowProps = (props) => <div {...props} />;

RowProps.defaultProps = {
  alignItems: 'center',
  inline: false,
  justifyContent: undefined,
  reverse: false,
  wrap: undefined,
};

RowProps.propTypes = {
  alignItems: PropTypes.string,
  inline: PropTypes.bool,
  justifyContent: PropTypes.string,
  reverse: PropTypes.bool,
  wrap: PropTypes.string,
};
