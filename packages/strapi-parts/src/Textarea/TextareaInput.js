import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useField } from '../Field';

const Textarea = styled.textarea`
  display: block;
  width: 100%;

  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};

  padding-left: ${({ theme, hasLeftAction }) => (hasLeftAction ? 0 : theme.spaces[4])};
  padding-right: ${({ theme, hasRightAction }) => (hasRightAction ? 0 : theme.spaces[4])};
  padding-top: ${({ theme }) => `${theme.spaces[3]}`};
  padding-bottom: ${({ theme }) => `${theme.spaces[3]}`};

  font-weight: 400;
  font-size: ${14 / 16}rem;

  color: ${({ theme, disabled }) => (disabled ? theme.colors.neutral600 : theme.colors.neutral800)};
  background: ${({ theme, disabled }) => (disabled ? theme.colors.neutral150 : theme.colors.neutral0)};

  /* managed by switching borders */
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }
`;

export const TextareaInput = forwardRef(({ disabled, ...props }, ref) => {
  const { id, error, hint, name } = useField();

  let ariaDescription;

  if (error) {
    ariaDescription = `${id}-error`;
  } else if (hint) {
    ariaDescription = `${id}-hint`;
  }

  const hasError = Boolean(error);

  return (
    <Textarea
      id={id}
      name={name}
      ref={ref}
      aria-describedby={ariaDescription}
      aria-invalid={hasError}
      disabled={disabled}
      hasError={hasError}
      {...props}
    />
  );
});

TextareaInput.displayName = 'TextareaInput';

TextareaInput.defaultProps = {
  disabled: false,
};

TextareaInput.propTypes = {
  disabled: PropTypes.bool,
};
