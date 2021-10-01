import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { sizes } from '../themes/sizes';
import { getThemeSize } from '../themes/utils';
import { useField } from './FieldContext';
import { Row } from '../Row';
import { Box } from '../Box';

const Input = styled.input`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding-left: ${({ theme, hasLeftAction }) => (hasLeftAction ? 0 : theme.spaces[4])};
  padding-right: ${({ theme, hasRightAction }) => (hasRightAction ? 0 : theme.spaces[4])};

  color: ${({ theme }) => theme.colors.neutral800};
  font-weight: 400;
  // TODO: Make sure to use the theme when it's ready
  font-size: ${14 / 16}rem;
  display: block;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }

  &[aria-disabled='true'] {
    background: inherit;
    color: inherit;
  }

  //focus managed by InputWrapper
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const InputWrapper = styled(Row)`
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  height: ${getThemeSize('input')};

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.6);
  }

  ${({ theme, disabled }) =>
    disabled
      ? `
    color: ${theme.colors.neutral600};
    background: ${theme.colors.neutral150};
  
  `
      : undefined}
`;

export const FieldInput = forwardRef(({ endAction, startAction, disabled, onChange, size, ...props }, ref) => {
  const { id, error, hint, name } = useField();

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
  onChange: () => {},
};

FieldInput.propTypes = {
  disabled: PropTypes.bool,
  endAction: PropTypes.element,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  startAction: PropTypes.element,
};
