import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '../../Flex';
import { Box } from '../../Box';
import { Typography } from '../../Typography';
import ChevronRight from '@strapi/icons/ChevronRight';

export const CrumbWrapper = styled(Flex)`
  svg {
    height: 10px;
    width: 10px;
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  :last-of-type ${Box} {
    display: none;
  }
  :last-of-type ${Typography} {
    color: ${({ theme }) => theme.colors.neutral800};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

export const Crumb = ({ children }) => {
  return (
    <CrumbWrapper inline as="li">
      <Typography variant="pi" textColor="neutral600">
        {children}
      </Typography>
      <Box paddingLeft={3} paddingRight={3}>
        <ChevronRight />
      </Box>
    </CrumbWrapper>
  );
};

Crumb.displayName = 'Crumb';
Crumb.propTypes = {
  children: PropTypes.string.isRequired,
};
