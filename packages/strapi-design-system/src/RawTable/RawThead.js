import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

export const RawThead = ({ children, ...props }) => {
  /**
   * aria-rowindex is 1-based: we have to start from 1
   */
  const childrenClone = Children.toArray(children).map((child) => cloneElement(child, { 'aria-rowindex': 1 }));

  return <thead {...props}>{childrenClone}</thead>;
};

RawThead.propTypes = {
  children: PropTypes.node.isRequired,
};
