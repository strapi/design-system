import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RadioContext } from './context';
import { getRadioSize, getSelectedRadioSize, getSelectedRadioPosition } from './utils';

const RadioInput = styled.input`
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.primary600};
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
    background: ${({ theme }) => theme.colors.primary600};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.carbon300};
    background: ${({ theme }) => theme.colors.neutral200};
  }
`;

export const BaseRadio = React.forwardRef(({ value, disabled, ...props }, ref) => {
  const { onChange, selected, name, size } = useContext(RadioContext);
  const isSelected = selected === value;

  return (
    <RadioInput
      ref={ref}
      type="radio"
      name={name}
      value={value}
      tabIndex={isSelected ? 0 : -1}
      aria-checked={isSelected}
      checked={isSelected}
      disabled={disabled}
      size={size}
      onChange={onChange}
      {...props}
    />
  );
});

BaseRadio.displayName = 'Radio';

BaseRadio.defaultProps = {
  disabled: false,
};

BaseRadio.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
};
