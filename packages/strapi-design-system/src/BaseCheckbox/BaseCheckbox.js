import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';
import { getCheckboxSize } from './utils';

import checkmarkIcon from './assets/checkmark.svg';
import checkmarkIconDisabled from './assets/checkmark-black.svg';

const CheckboxInput = styled.input`
  margin: 0;
  height: ${getCheckboxSize};
  min-width: ${getCheckboxSize};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.neutral300};
  -webkit-appearance: none;
  background-color: ${({ theme }) => theme.colors.neutral0};
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary600};
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    &:after {
      content: '';
      display: block;
      position: relative;
      background: url(${checkmarkIcon}) no-repeat no-repeat center center;
      width: 10px;
      height: 10px;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &:disabled:after {
      background: url(${checkmarkIconDisabled}) no-repeat no-repeat center center;
    }
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral200};
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
  }

  &:indeterminate {
    background-color: ${({ theme }) => theme.colors.primary600};
    border: 1px solid ${({ theme }) => theme.colors.primary600};

    &:after {
      content: '';
      display: block;
      position: relative;
      color: white;
      height: 2px;
      width: 10px;
      background-color: ${({ theme }) => theme.colors.neutral0};
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.neutral200};
      border: 1px solid ${({ theme }) => theme.colors.neutral300};
      &:after {
        background-color: ${({ theme }) => theme.colors.neutral500};
      }
    }
  }
`;

export const BaseCheckbox = ({ indeterminate, size, name, value, onValueChange, ...inputProps }) => {
  const checkboxRef = useRef();

  useEffect(() => {
    if (checkboxRef.current && indeterminate) {
      checkboxRef.current.indeterminate = indeterminate;
    } else {
      checkboxRef.current.indeterminate = false;
    }
  }, [indeterminate]);

  const handleValueChange = () => {
    onValueChange(!value);
  };

  return (
    <Box>
      <CheckboxInput
        size={size}
        checked={value}
        onChange={handleValueChange}
        type="checkbox"
        ref={checkboxRef}
        name={name}
        {...inputProps}
      />
    </Box>
  );
};

BaseCheckbox.displayName = 'BaseCheckbox';

BaseCheckbox.defaultProps = {
  indeterminate: false,
  name: null,
  onValueChange() {},
  size: 'M',
  value: false,
};

BaseCheckbox.propTypes = {
  /**
   * If `true`, display the indeterminate state.
   */
  indeterminate: PropTypes.bool,
  /**
   * `Checkbox` input name
   */
  name: PropTypes.string,
  /**
   * The callback invoked when click on the `Checkbox`
   * `(value: Bool) => {}`
   */
  onValueChange: PropTypes.func,
  /**
   * Set the size of the checkbox
   */
  size: PropTypes.oneOf(['M', 'L']),
  value: PropTypes.bool,
};
