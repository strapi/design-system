import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronRight from '@strapi/icons/ChevronRight';
import { Typography } from '../Text';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { VisuallyHidden } from '../VisuallyHidden';

const CrumbWrapper = styled(Flex)`
  svg {
    height: 10px;
    width: 10px;
  }
  svg path {
    fill: ${({ theme }) => theme.colors.neutral300};
  }
  :last-of-type ${Box} {
    display: none;
  }
`;

export const Crumb = ({ children }) => {
  return (
    <CrumbWrapper inline as="li">
      <Typography fontWeight="bold" color="neutral800">
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
const crumbType = PropTypes.shape({ type: PropTypes.oneOf([Crumb]) });

export const Breadcrumbs = ({ children, label, ...props }) => (
  <Flex {...props}>
    <VisuallyHidden>{label}</VisuallyHidden>
    <ol aria-hidden={true}>{children}</ol>
  </Flex>
);

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(crumbType), crumbType]).isRequired,
  label: PropTypes.string.isRequired,
};
