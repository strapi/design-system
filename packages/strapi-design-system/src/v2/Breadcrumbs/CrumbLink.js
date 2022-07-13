import React from 'react';
import PropTypes from 'prop-types';
import ChevronRight from '@strapi/icons/ChevronRight';
import styled from 'styled-components';
import { Flex } from '../../Flex';
import { Box } from '../../Box';
import { BaseLink } from '../../BaseLink';

const CrumbWrapper = styled(Flex)`
  svg {
    height: ${10 / 16}rem;
    width: ${10 / 16}rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.neutral600};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: ${({ theme }) => theme.lineHeights[3]};
    padding: ${({ theme }) => theme.spaces[1]};
    border-radius: ${({ theme }) => theme.borderRadius};
    :hover,
    :focus {
      background-color: ${({ theme }) => theme.colors.neutral200};
      color: ${({ theme }) => theme.colors.neutral700};
    }
  }
  :last-of-type ${Box} {
    display: none;
  }
  :last-of-type a {
    color: ${({ theme }) => theme.colors.neutral800};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

export const CrumbLink = React.forwardRef(({ children, href, ...props }, ref) => {
  return (
    <CrumbWrapper inline as="li">
      <BaseLink href={href} ref={ref} {...props}>
        {children}
      </BaseLink>
      <Box aria-hidden paddingLeft={2} paddingRight={2}>
        <ChevronRight />
      </Box>
    </CrumbWrapper>
  );
});

CrumbLink.displayName = 'CrumbLink';
CrumbLink.defaultProps = {
  href: undefined,
};
CrumbLink.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
};
