import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { useTable } from './RawTableContext';

export const RawThead = ({ children, ...props }) => {
  const { rowIndex, colIndex } = useTable();

  /**
   * aria-rowindex is 1-based: we have to start from 1
   */
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { focusedColIndex: rowIndex === index ? colIndex : undefined, 'aria-rowindex': 1 }),
  );

  return <thead {...props}>{childrenClone}</thead>;
};

RawThead.propTypes = {
  children: PropTypes.node.isRequired,
};
