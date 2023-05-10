import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';
import { useField } from '../Field';
import { inputFocusStyle } from '../themes/utils';

const Wrapper = styled(Box)`
  ${inputFocusStyle()}
`;

const Textarea = styled(Box)`
  border: none;
  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }

  &:focus-within {
    outline: none;
  }
`;

export const TextareaInput = forwardRef(({ disabled, ...props }, ref) => {
  const { id, error, hint, required } = useField();

  let ariaDescription;

  if (error) {
    ariaDescription = `${id}-error`;
  } else if (hint) {
    ariaDescription = `${id}-hint`;
  }

  const hasError = Boolean(error);

  return (
    <Wrapper borderColor={hasError ? 'danger600' : 'neutral200'} hasRadius>
      <Textarea
        aria-describedby={ariaDescription}
        aria-invalid={hasError}
        aria-required={required}
        as="textarea"
        background={disabled ? 'neutral150' : 'neutral0'}
        color={disabled ? 'neutral600' : 'neutral800'}
        fontSize={2}
        hasRadius
        height={`${105 / 16}rem`}
        id={id}
        ref={ref}
        disabled={disabled}
        lineHeights={4}
        padding={4}
        width="100%"
        {...props}
      />
    </Wrapper>
  );
});

TextareaInput.displayName = 'TextareaInput';

TextareaInput.defaultProps = {
  disabled: false,
};

TextareaInput.propTypes = {
  disabled: PropTypes.bool,
};
