import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { useTable } from './TableContext';

export const Thead = ({ children, ...props }) => {
  const { rowIndex, colIndex } = useTable();

  /**
   * aria-rowindex is 1-based: we have to start from 1
   */
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { focusedColIndex: rowIndex === index ? colIndex : undefined, 'aria-rowindex': 1 }),
  );

  return <thead {...props}>{childrenClone}</thead>;
};

export const Tbody = ({ children, ...props }) => {
  const { rowIndex, colIndex } = useTable();

  /**
   * aria-rowindex is 1-based: we have to start from 1
   * since the <tr><th></th></tr> elements count as 1 row, we have to increment the index by 2 (because of the base 1 AND the th)
   */
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { focusedColIndex: rowIndex - 1 === index ? colIndex : undefined, 'aria-rowindex': index + 2 }),
  );

  return <tbody {...props}>{childrenClone}</tbody>;
};

Thead.propTypes = {
  children: PropTypes.node.isRequired,
};

Tbody.propTypes = {
  children: PropTypes.node.isRequired,
};
