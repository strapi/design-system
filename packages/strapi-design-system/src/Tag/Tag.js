import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { Flex } from '../Flex';

const TagIconWrapper = styled(Box)`
  svg {
    height: ${8 / 16}rem;
    width: ${8 / 16}rem;
  }

  svg path {
    fill: ${({ theme, ...p }) => (p['aria-disabled'] ? theme.colors.neutral600 : theme.colors.primary600)};
  }

  &:hover svg path,
  &:focus svg path {
    fill: ${({ theme, ...p }) => (p['aria-disabled'] ? theme.colors.neutral600 : theme.colors.primary500)};
  }
`;

const TagText = styled(Typography)`
  border-right: 1px solid ${({ theme, disabled }) => (disabled ? theme.colors.neutral300 : theme.colors.primary200)};
  color: inherit;
  padding-right: ${({ theme }) => theme.spaces[2]};
`;

export const Tag = ({ children, icon, disabled, onClick, actionLabel, ...props }) => {
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <Box
      display="inline-block"
      background={disabled ? 'neutral200' : 'primary100'}
      color={disabled ? 'neutral700' : 'primary600'}
      paddingLeft={3}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={disabled ? 'neutral300' : 'primary200'}
      hasRadius
      height={`${32 / 16}rem`}
      {...props}
    >
      <Flex height="100%">
        <TagText disabled={disabled} variant="pi" fontWeight="bold" as="span">
          {children}
        </TagText>

        <TagIconWrapper
          as="button"
          aria-disabled={disabled}
          aria-label={actionLabel}
          paddingLeft={2}
          paddingRight={3}
          height="100%"
          onClick={handleClick}
          cursor={disabled ? 'auto' : 'pointer'}
        >
          <Flex height="100%" alignItems="center">
            {icon}
          </Flex>
        </TagIconWrapper>
      </Flex>
    </Box>
  );
};

Tag.displayName = 'Tag';

Tag.defaultProps = {
  disabled: false,
  onClick: undefined,
};

Tag.propTypes = {
  actionLabel: PropTypes.string,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};
