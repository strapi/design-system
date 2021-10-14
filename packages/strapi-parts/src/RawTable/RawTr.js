import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

export const RawTr = ({ children, focusedColIndex, ...props }) => {
  const childrenClone = Children.toArray(children).map((child, index) =>
    cloneElement(child, { isFocusable: focusedColIndex === index, 'aria-colindex': index + 1 }),
  );

  return (
    <Box as="tr" {...props}>
      {childrenClone}
    </Box>
  );
};

RawTr.defaultProps = {
  focusedColIndex: undefined,
};

RawTr.propTypes = {
  children: PropTypes.node.isRequired,
  focusedColIndex: PropTypes.number,
};
