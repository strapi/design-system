import React, { useEffect, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getCheckboxSize } from './utils';
import checkmarkIcon from './assets/checkmark.svg';
import checkmarkIconDisabled from './assets/checkmark-black.svg';

const CheckboxInput = styled.input`
  height: ${getCheckboxSize};
  width: ${getCheckboxSize};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.neutral300};
  -webkit-appearance: none;

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

export const Checkbox = forwardRef(({ indeterminate, size, name, value, onChange, ...inputProps }, ref) => {
  const innerRef = useRef(null);
  const ariaChecked = indeterminate ? 'mixed' : value;

  useImperativeHandle(ref, () => innerRef.current, [innerRef]);

  useEffect(() => {
    if (innerRef.current && indeterminate) {
      innerRef.current.indeterminate = indeterminate;
    } else {
      innerRef.current.indeterminate = false;
    }
  }, [indeterminate]);

  const handleChange = () => {
    const target = {
      name,
      value: !value,
    };

    onChange({ target });
  };

  return (
    <CheckboxInput
      size={size}
      checked={value}
      onChange={handleChange}
      aria-checked={ariaChecked}
      type="checkbox"
      ref={innerRef}
      name={name}
      {...inputProps}
    />
  );
});

Checkbox.displayName = Checkbox;

Checkbox.defaultProps = {
  indeterminate: false,
  name: null,
  onChange: () => {},
  size: 'M',
  value: false,
};

Checkbox.propTypes = {
  indeterminate: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['M', 'L']),
  value: PropTypes.bool,
};
