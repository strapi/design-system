import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { Flex } from '../Flex';

const TagWrapper = styled(Box)`
  svg {
    height: ${8 / 16}rem;
    width: ${8 / 16}rem;
  }

  svg path {
    fill: ${({ theme, ...p }) => (p['aria-disabled'] ? theme.colors.neutral600 : theme.colors.primary600)};
  }
`;

const TagText = styled(Typography)`
  border-right: 1px solid ${({ theme, disabled }) => (disabled ? theme.colors.neutral300 : theme.colors.primary200)};
  color: inherit;
  padding-right: ${({ theme }) => theme.spaces[2]};
`;

export const Tag = ({ children, icon, disabled, onClick, ...props }) => {
  const handleClick = (e) => {
    if (disabled) return;
    onClick(e);
  };

  return (
    <TagWrapper
      as="button"
      background={disabled ? 'neutral200' : 'primary100'}
      color={disabled ? 'neutral700' : 'primary600'}
      paddingLeft={3}
      paddingRight={3}
      onClick={handleClick}
      aria-disabled={disabled}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={disabled ? 'neutral300' : 'primary200'}
      hasRadius
      height={`${32 / 16}rem`}
      {...props}
    >
      <Flex>
        <TagText disabled={disabled} variant="pi" fontWeight="bold" as="span">
          {children}
        </TagText>

        <Box paddingLeft={2}>
          <Flex>{icon}</Flex>
        </Box>
      </Flex>
    </TagWrapper>
  );
};

Tag.displayName = 'Tag';

Tag.defaultProps = {
  disabled: false,
  onClick: undefined,
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};
