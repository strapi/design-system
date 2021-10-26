import React from 'react';
import PropTypes from 'prop-types';

export const PopoverContentProps = (props) => <div {...props} />;

PopoverContentProps.defaultProps = {
  fullWidth: false,
  intersectionId: undefined,
  onReachEnd: undefined,
  centered: false,
};

PopoverContentProps.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  intersectionId: PropTypes.string,
  onReachEnd: PropTypes.func,
  source: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  spacing: PropTypes.number,
};
