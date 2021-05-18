import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

export const Tr = ({ children, focusedColIndex, ...props }) => {
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { isFocused: focusedColIndex === index, 'aria-colindex': index + 1 }),
  );
  return <tr {...props}>{childrenClone}</tr>;
};

Tr.defaultProps = {
  focusedColIndex: undefined,
};

Tr.propTypes = {
  children: PropTypes.node.isRequired,
  focusedColIndex: PropTypes.number,
};
