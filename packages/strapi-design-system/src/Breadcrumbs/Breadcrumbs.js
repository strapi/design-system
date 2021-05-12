import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { After } from '@strapi/icons';
import { Text } from '../Text';
import { Box } from '../Box';
import { Row } from '../Row';
import { useId } from '../helpers/useId';

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
      <Text highlighted color="neutral800">
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

export const Breadcrumbs = ({ children }) => {
  const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));

  return <ol>{validChildren}</ol>;
};

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};
