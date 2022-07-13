import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../../Box';
import { Crumb } from './Crumb';
import { CrumbLink } from './CrumbLink';
import { CrumbSimpleMenu } from './CrumbSimpleMenu';

const ListFlex = styled.ol`
  display: flex;
`;

export const Breadcrumbs = ({ label, children, ...props }) => {
  return (
    <Box aria-label={label} {...props}>
      <ListFlex aria-hidden={true}>{children}</ListFlex>
    </Box>
  );
};

const crumbType = PropTypes.shape({ type: PropTypes.oneOf([Crumb, CrumbLink, CrumbSimpleMenu]) });

Breadcrumbs.displayName = 'Breadcrumbs';
Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(crumbType), crumbType]).isRequired,
  label: PropTypes.string.isRequired,
};
