import React from 'react';
import PropTypes from 'prop-types';
import ChevronRight from '@strapi/icons/ChevronRight';
import styled from 'styled-components';
import { Flex } from '../../Flex';
import { Box } from '../../Box';
import { BaseLink } from '../../BaseLink';

export const CrumbWrapper = styled(Flex)`
  svg {
    height: 10px;
    width: 10px;
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.neutral600};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: ${({ theme }) => theme.lineHeights[3]};
  }
  :last-of-type ${Box} {
    display: none;
  }
  :last-of-type a {
    color: ${({ theme }) => theme.colors.neutral800};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

export const CrumbLink = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <CrumbWrapper inline as="li">
      <BaseLink ref={ref} {...props}>
        {children}
      </BaseLink>
      <Box paddingLeft={3} paddingRight={3}>
        <ChevronRight />
      </Box>
    </CrumbWrapper>
  );
});

CrumbLink.displayName = 'CrumbLink';
CrumbLink.propTypes = {
  children: PropTypes.string.isRequired,
};
