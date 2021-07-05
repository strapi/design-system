import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getFocusableNodes } from '../helpers/getFocusableNodes';

export const RawTh = ({ isFocusable, ...props }) => {
  const thRef = useRef(null);

  useLayoutEffect(() => {
    const focusableNodes = getFocusableNodes(thRef.current, true);
    const nextFocus = focusableNodes[0] || thRef.current;

    nextFocus.setAttribute('tabIndex', isFocusable ? 0 : -1);
  }, [isFocusable]);

  return <th ref={thRef} {...props} />;
};

export const RawTd = ({ isFocusable, ...props }) => {
  const tdRef = useRef(null);

  useLayoutEffect(() => {
    const focusableNodes = getFocusableNodes(tdRef.current, true);
    const nextFocus = focusableNodes[0] || tdRef.current;

    nextFocus.setAttribute('tabIndex', isFocusable ? 0 : -1);
  }, [isFocusable]);

  return <td ref={tdRef} {...props} />;
};

RawTh.defaultProps = {
  isFocusable: false,
};

RawTh.propTypes = {
  isFocusable: PropTypes.bool,
};

RawTd.defaultProps = {
  isFocusable: false,
};

RawTd.propTypes = {
  isFocusable: PropTypes.bool,
};
