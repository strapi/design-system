import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '../../Flex';
import { Crumb } from './Crumb';
import { CrumbLink } from './CrumbLink';

export const Breadcrumbs = ({ label, children, ...props }) => {
  return (
    <Flex aria-label={label} {...props}>
      <ol aria-hidden={true}>{children}</ol>
    </Flex>
  );
};

const crumbType = PropTypes.shape({ type: PropTypes.oneOf([Crumb, CrumbLink]) });

Breadcrumbs.displayName = 'Breadcrumbs';
Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(crumbType), crumbType]).isRequired,
  label: PropTypes.string.isRequired,
};
