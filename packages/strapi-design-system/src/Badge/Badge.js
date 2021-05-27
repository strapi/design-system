import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { TableLabel } from '../Text';
import styled from 'styled-components';

const BadgeWrapper = styled(Box)`
  display: inline-block;
`;

export const Badge = ({ active, ...props }) => {
  return (
    <BadgeWrapper
      padding={1}
      background={active ? 'primary100' : 'neutral100'}
      hasRadius={true}
      color={active ? 'primary600' : 'neutral600'}
    >
      <TableLabel {...props} />
    </BadgeWrapper>
  );
};

Badge.defaultProps = {
  active: false,
};

Badge.propTypes = {
  active: PropTypes.bool,
};
