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

export const TextButton = React.forwardRef(({ children, leftIcon, rightIcon, onClick, disabled, ...props }, ref) => {
  const handleClick = onClick && !disabled ? onClick : undefined;

  return (
    <TextButtonWrapper ref={ref} disabled={disabled} onClick={handleClick} as="button" {...props}>
      {leftIcon && (
        <Box as="span" paddingRight={2} aria-hidden={true}>
          {leftIcon}
        </Box>
      )}
      <Text small={true} textColor={disabled ? 'neutral600' : 'primary600'} as="span">
        {children}
      </Text>
      {rightIcon && (
        <Box as="span" paddingLeft={2} aria-hidden={true}>
          {rightIcon}
        </Box>
      )}
    </TextButtonWrapper>
  );
});

TextButton.displayName = 'TextButton';

TextButton.defaultProps = {
  disabled: false,
  leftIcon: undefined,
  rightIcon: undefined,
  onClick: undefined,
};

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.element,
  onClick: PropTypes.func,
  rightIcon: PropTypes.element,
};
