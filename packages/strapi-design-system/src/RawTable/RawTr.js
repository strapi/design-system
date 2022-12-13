import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const RawTr = ({ children, ...props }) => {
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { 'aria-colindex': index + 1, coords: { col: index + 1, row: props['aria-rowindex'] } }),
  );

  return (
    <Box as="tr" {...props}>
      {childrenClone}
    </Box>
  );
};

RawTr.propTypes = {
  'aria-rowindex': PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
