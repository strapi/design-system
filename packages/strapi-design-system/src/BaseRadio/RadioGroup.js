import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { genId } from '../helpers/genId';
import { RadioContext } from './context';
import { setTabIndexOnFirstItem } from '../helpers/setTabIndexOnFirstItem';

export const RadioGroup = ({ children, labelledBy, onSelect, value, size, ...props }) => {
  const nameRef = useRef(genId());
  const radioGroupRef = useRef(null);

  useLayoutEffect(() => {
    if (!value) {
      setTabIndexOnFirstItem(radioGroupRef.current, `[name="${nameRef.current}"]`);
    }
  }, [value]);

  return (
    <RadioContext.Provider value={{ onSelect, selected: value, name: nameRef.current, size }}>
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
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string,
  size: PropTypes.oneOf(['M', 'L']),
};
