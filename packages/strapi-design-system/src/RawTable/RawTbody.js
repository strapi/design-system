import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

export const RawTbody = ({ children, ...props }) => {
  /**
   * aria-rowindex is 1-based: we have to start from 1
   * since the <tr><th></th></tr> elements count as 1 row, we have to increment the index by 2 (because of the base 1 AND the th)
   */
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { 'aria-rowindex': index + 2 }),
  );

  return <tbody {...props}>{childrenClone}</tbody>;
};

RawTbody.propTypes = {
  children: PropTypes.node.isRequired,
};
