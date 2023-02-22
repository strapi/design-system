import * as React from 'react';

import { ChevronRight } from '@strapi/icons';
import styled from 'styled-components';

import { Box } from '../Box';
import { Flex, FlexProps } from '../Flex';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const CrumbWrapper = styled(Flex)`
  svg {
    height: ${10 / 16}rem;
    width: ${10 / 16}rem;
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

export interface CrumbProps {
  children: React.ReactNode;
}

export const Crumb = ({ children }: CrumbProps) => {
  return (
    <CrumbWrapper inline as="li">
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

export interface BreadcrumbsProps extends FlexProps {
  children: React.ReactNode;
  label: string;
}

export const Breadcrumbs = ({ children, label, ...props }: BreadcrumbsProps) => (
  <Flex {...props}>
    <VisuallyHidden>{label}</VisuallyHidden>
    <ol aria-hidden>{children}</ol>
  </Flex>
);

Breadcrumbs.displayName = 'Breadcrumbs';
