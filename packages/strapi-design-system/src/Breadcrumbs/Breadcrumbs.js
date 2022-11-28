import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronRight from '@strapi/icons/ChevronRight';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { Flex } from '../Flex';
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

export const Crumb = ({ children }) => {
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
Crumb.propTypes = {
  children: PropTypes.node.isRequired,
};
const crumbType = PropTypes.shape({ type: PropTypes.oneOf([Crumb]) });

export const Breadcrumbs = ({ children, label, ...props }) => (
  <Flex {...props}>
    <VisuallyHidden>{label}</VisuallyHidden>
    <ol aria-hidden>{children}</ol>
  </Flex>
);

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(crumbType), crumbType]).isRequired,
  label: PropTypes.string.isRequired,
};
