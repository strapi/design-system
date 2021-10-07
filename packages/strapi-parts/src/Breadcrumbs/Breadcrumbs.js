import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import After from '@strapi/icons/After';
import { Text } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';
import { VisuallyHidden } from '../VisuallyHidden';

const CrumbWrapper = styled(Row)`
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
      <Text bold color="neutral800">
        {children}
      </Text>
      <Box paddingLeft={3} paddingRight={3}>
        <After />
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
  <Row {...props}>
    <VisuallyHidden>{label}</VisuallyHidden>
    <ol aria-hidden={true}>{children}</ol>
  </Row>
);

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(crumbType), crumbType]).isRequired,
  label: PropTypes.string.isRequired,
};
