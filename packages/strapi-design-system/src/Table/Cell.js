import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const useCell = (isFocused) => {
  const mountedRef = useRef(false);
  const cellRef = useRef(null);

  useEffect(() => {
    if (mountedRef.current && isFocused) {
      cellRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  return cellRef;
};

export const Th = ({ isFocused, ...props }) => {
  const cellRef = useCell(isFocused);

  return <th ref={cellRef} tabIndex={isFocused ? 0 : -1} {...props} />;
};

export const Td = ({ isFocused, ...props }) => {
  const cellRef = useCell(isFocused);

  return <td ref={cellRef} tabIndex={isFocused ? 0 : -1} {...props} />;
};

Th.defaultProps = {
  isFocused: false,
};

Th.propTypes = {
  isFocused: PropTypes.bool,
};

Td.defaultProps = {
  isFocused: false,
};

Td.propTypes = {
  isFocused: PropTypes.bool,
};
