import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getFocusableNodes } from '../helpers/getFocusableNodes';

export const Th = ({ isFocusable, ...props }) => {
  return <th tabIndex={isFocusable ? 0 : -1} {...props} />;
};

export const Td = ({ isFocusable, ...props }) => {
  const tdRef = useRef(null);

  useLayoutEffect(() => {
    const focusableNodes = getFocusableNodes(tdRef.current);
    const nextFocus = focusableNodes.item(0) || tdRef.current;

    nextFocus.setAttribute('tabIndex', isFocusable ? 0 : -1);
  }, [isFocusable]);

  return <td ref={tdRef} {...props} />;
};

Th.defaultProps = {
  isFocusable: false,
};

Th.propTypes = {
  isFocusable: PropTypes.bool,
};

Td.defaultProps = {
  isFocusable: false,
};

Td.propTypes = {
  isFocusable: PropTypes.bool,
};
