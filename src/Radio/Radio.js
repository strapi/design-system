import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RadioContext } from './context';
import { getRadioSize, getSelectedRadioSize, getSelectedRadioPosition } from './utils';

// TODO: we need to use the theme here
const RadioInput = styled.input`
  margin: 0;
  padding: 0;
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.elixir600};
  border-radius: 50%;
  height: ${getRadioSize};
  width: ${getRadioSize};
  -webkit-appearance: none;

  &:after {
    border-radius: 50%;
    content: '';
    position: relative;
    z-index: 1;
    display: block;
    height: ${getSelectedRadioSize};
    width: ${getSelectedRadioSize};
    left: ${getSelectedRadioPosition};
    top: ${getSelectedRadioPosition};
  }

  &:checked:after {
    background: ${(props) => props.theme.color.elixir600};
  }

  &:disabled {
    border: 1px solid ${(props) => props.theme.color.carbon300};
    background: ${(props) => props.theme.color.carbon200};
  }
`;

export const Radio = React.forwardRef(({ value, id, disabled, ...props }, ref) => {
  const { onSelect, selected, name, size } = useContext(RadioContext);
  const isSelected = selected === value;

  return (
    <RadioInput
      ref={ref}
      id={id}
      type="radio"
      name={name}
      value={value}
      tabIndex={isSelected ? 0 : -1}
      aria-checked={isSelected}
      onChange={() => onSelect(value)}
      disabled={disabled}
      size={size}
      {...props}
    />
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
