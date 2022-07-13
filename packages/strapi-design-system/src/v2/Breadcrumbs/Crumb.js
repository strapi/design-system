import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '../../Flex';
import { Box } from '../../Box';
import { Typography } from '../../Typography';
import ChevronRight from '@strapi/icons/ChevronRight';

const CrumbWrapper = styled(Flex)`
  svg {
    height: ${10 / 16}rem;
    width: ${10 / 16}rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  ${Box} {
    display: ${({ isLast }) => (isLast ? 'none' : '')};
  }
  ${Typography} {
    color: ${({ theme, isLast }) => (isLast ? theme.colors.neutral800 : theme.colors.neutral600)};
    font-weight: ${({ theme, isLast }) => (isLast ? theme.fontWeights.bold : theme.fontWeights.regular)};
  }
`;

export const Crumb = ({ children, isLast }) => {
  return (
    <CrumbWrapper isLast={isLast} inline as="li">
      <Typography variant="pi" textColor="neutral600">
        {children}
      </Typography>
      <Box aria-hidden paddingLeft={3} paddingRight={3}>
        <ChevronRight />
      </Box>
    </CrumbWrapper>
  );
};

Crumb.displayName = 'Crumb';
Crumb.defaultProps = {
  isLast: false,
};
Crumb.propTypes = {
  children: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
};
