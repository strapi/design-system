import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { sizes } from '../themes/sizes';
import { inputFocusStyle } from '../themes/utils';
import { useField } from './FieldContext';
import { Flex } from '../Flex';
import { Box } from '../Box';

// padding-[top|bottom] must ensure, the input matches the height of getThemeSize('input')
const PADDING_Y = {
  S: 6.5,
  M: 10.5,
};

const Input = styled.input`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding-bottom: ${({ size }) => `${PADDING_Y[size] / 16}rem`};
  padding-left: ${({ theme, hasLeftAction }) => (hasLeftAction ? 0 : theme.spaces[4])};
  padding-right: ${({ theme, hasRightAction }) => (hasRightAction ? 0 : theme.spaces[4])};
  padding-top: ${({ size }) => `${PADDING_Y[size] / 16}rem`};
  cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : undefined)};

  color: ${({ theme }) => theme.colors.neutral800};
  font-weight: 400;
  // TODO: Make sure to use the theme when it's ready
  font-size: ${14 / 16}rem;
  display: block;
  width: 100%;
  background: inherit;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }

  &[aria-disabled='true'] {
    color: inherit;
  }

  //focus managed by InputWrapper
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const InputWrapper = styled(Flex)`
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  ${inputFocusStyle()}

  ${({ theme, disabled }) =>
    disabled
      ? `
    color: ${theme.colors.neutral600};
    background: ${theme.colors.neutral150};
  
  `
      : undefined}
`;

export const FieldInput = forwardRef(({ endAction, startAction, disabled, onChange, size, ...props }, ref) => {
  const { id, error, hint, name, required } = useField();

  let ariaDescription;

  if (error) {
    ariaDescription = `${id}-error`;
  } else if (hint) {
    ariaDescription = `${id}-hint`;
  }

  const hasError = Boolean(error);

  const handleChange = (e) => {
    if (!disabled) {
      onChange(e);
    }
  };

  return (
    <InputWrapper size={size} justifyContent="space-between" hasError={hasError} disabled={disabled}>
      {startAction && (
        <Box paddingLeft={3} paddingRight={2}>
          {startAction}
        </Box>
      )}
      <Input
        id={id}
        name={name}
        ref={ref}
        aria-describedby={ariaDescription}
        aria-invalid={hasError}
        aria-disabled={disabled}
        hasLeftAction={Boolean(startAction)}
        hasRightAction={Boolean(endAction)}
        onChange={handleChange}
        aria-required={required}
        size={size}
        {...props}
      />
      {endAction && (
        <Box paddingLeft={2} paddingRight={3}>
          {endAction}
        </Box>
      )}
    </InputWrapper>
  );
});

FieldInput.displayName = 'FieldInput';

FieldInput.defaultProps = {
  disabled: false,
  endAction: undefined,
  size: 'M',
  startAction: undefined,
  onChange() {},
};

FieldInput.propTypes = {
  disabled: PropTypes.bool,
  endAction: PropTypes.element,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startAction: PropTypes.element,
};
