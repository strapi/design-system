import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { Row } from '../Row';

const TextButtonWrapper = styled(Row)`
  background: transparent;
  border: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};

  svg {
    display: flex;
    font-size: ${10 / 16}rem;
  }

  svg path {
    fill: ${({ disabled, theme }) => (disabled ? theme.colors.neutral600 : theme.colors.primary600)};
  }
`;

export const TextButton = React.forwardRef(({ children, startIcon, endIcon, onClick, disabled, ...props }, ref) => {
  const handleClick = onClick && !disabled ? onClick : undefined;

  return (
    <TextButtonWrapper
      ref={ref}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
      as="button"
      {...props}
    >
      {startIcon && (
        <Box as="span" paddingRight={2} aria-hidden={true}>
          {startIcon}
        </Box>
      )}
      <Text small={true} textColor={disabled ? 'neutral600' : 'primary600'}>
        {children}
      </Text>
      {endIcon && (
        <Box as="span" paddingLeft={2} aria-hidden={true}>
          {endIcon}
        </Box>
      )}
    </TextButtonWrapper>
  );
});

TextButton.displayName = 'TextButton';

TextButton.defaultProps = {
  disabled: false,
  startIcon: undefined,
  endIcon: undefined,
  onClick: undefined,
};

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  onClick: PropTypes.func,
  startIcon: PropTypes.element,
};
