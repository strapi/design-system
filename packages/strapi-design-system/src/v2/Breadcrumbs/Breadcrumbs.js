import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../../Box';
import { Crumb } from './Crumb';
import { CrumbLink } from './CrumbLink';
import { CrumbSimpleMenu } from './CrumbSimpleMenu';
import { Divider } from './Divider';
import { Flex } from '../../Flex';

export const Breadcrumbs = ({ label, children, ...props }) => {
  return (
    <Box aria-label={label} {...props}>
      <Flex as="ol" horizontal>
        {Children.map(children, (child, index) => {
          const isLast = index + 1 === children.length;

          return (
            <Flex inline as="li">
              {child}
              {!isLast && <Divider />}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

const crumbType = PropTypes.shape({ type: PropTypes.oneOf([Crumb, CrumbLink, CrumbSimpleMenu]) });

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(crumbType), crumbType]).isRequired,
  label: PropTypes.string.isRequired,
};
