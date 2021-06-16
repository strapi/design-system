import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

export const RawTr = ({ children, focusedColIndex, ...props }) => {
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { isFocusable: focusedColIndex === index, 'aria-colindex': index + 1 }),
  );

  return <tr {...props}>{childrenClone}</tr>;
};

RawTr.defaultProps = {
  focusedColIndex: undefined,
};

RawTr.propTypes = {
  children: PropTypes.node.isRequired,
  focusedColIndex: PropTypes.number,
};
