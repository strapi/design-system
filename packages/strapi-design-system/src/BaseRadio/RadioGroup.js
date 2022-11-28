import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { RadioContext } from './context';
import { setTabIndexOnFirstItem } from '../helpers/setTabIndexOnFirstItem';

export const RadioGroup = ({ children, labelledBy, onChange, value, size, name, ...props }) => {
  const radioGroupRef = useRef(null);

  useLayoutEffect(() => {
    if (!value) {
      setTabIndexOnFirstItem(radioGroupRef.current, `[name="${name}"]`);
    }
  }, [value, name]);

  return (
    <RadioContext.Provider value={{ onChange, selected: value, name, size }}>
      <div ref={radioGroupRef} role="radiogroup" aria-labelledby={labelledBy} {...props}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

RadioGroup.defaultProps = {
  value: '',
  size: 'M',
};

RadioGroup.propTypes = {
  children: PropTypes.node.isRequired,
  labelledBy: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['M', 'L']),
  value: PropTypes.string,
};
