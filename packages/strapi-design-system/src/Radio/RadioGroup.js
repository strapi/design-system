import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { genId } from '../helpers';
import { RadioContext } from './context';

export const RadioGroup = ({ children, labelledBy, onSelect, value, size = 'S', ...props }) => {
  const nameRef = useRef(genId());
  const radioGroupRef = useRef(null);

  useLayoutEffect(() => {
    if (!value) {
      const radios = radioGroupRef.current?.querySelectorAll(`[name="${nameRef.current}"]`);

      // When mounting the component, the first radio button has to be focusable
      if (radios && radios.length > 0) {
        radios.item(0).setAttribute('tabindex', '0');
      }
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

RadioGroup.propTypes = {
  children: PropTypes.node.isRequired,
  labelledBy: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['S', 'L']),
  value: PropTypes.string,
};
