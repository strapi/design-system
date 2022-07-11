import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '../../Flex';
import { VisuallyHidden } from '../../VisuallyHidden';

export const Breadcrumbs = ({ label, children, ...props }) => {
  return (
    <Flex {...props}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <ol aria-hidden={true}>{children}</ol>
    </Flex>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
Breadcrumbs.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};
