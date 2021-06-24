import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';

const TagWrapper = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.primary200};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: ${32 / 16}rem;

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

const TagText = styled(Text)`
  border-right: 1px solid ${({ theme }) => theme.colors.primary200};
  padding-right: ${({ theme }) => theme.spaces[2]};
`;

export const Tag = ({ children, icon, ...props }) => (
  <TagWrapper as="button" background="primary100" color="primary600" paddingLeft={3} paddingRight={3} {...props}>
    <Row>
      <TagText small={true} highlighted={true} as="span">
        {children}
      </TagText>

      <Box paddingLeft={2}>
        <Row>{icon}</Row>
      </Box>
    </Row>
  </TagWrapper>
);

Tag.displayName = Tag;

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
