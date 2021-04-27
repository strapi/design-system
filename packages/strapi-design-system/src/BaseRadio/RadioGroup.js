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
  }, [value]);

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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  size: PropTypes.oneOf(['M', 'L']),
  name: PropTypes.string.isRequired,
};
