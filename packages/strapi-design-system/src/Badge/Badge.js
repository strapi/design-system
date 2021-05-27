import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { TableLabel } from '../Text';
import styled from 'styled-components';

const BadgeWrapper = styled(Box)`
  display: inline-block;
`;

export const Badge = (props) => {
  return (
    <BadgeWrapper padding={1} background="neutral100" hasRadius={true} color="neutral600">
      <TableLabel {...props} />
    </BadgeWrapper>
  );
};

Badge.displayName = Badge;

Badge.propTypes = {};
