import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Typography } from '../Text';
import styled from 'styled-components';

const BadgeWrapper = styled(Box)`
  display: inline-block;
`;

export const Badge = ({ active, textColor, backgroundColor, children, ...props }) => {
  return (
    <BadgeWrapper padding={1} background={active ? 'primary100' : backgroundColor} hasRadius {...props}>
      <Typography variant="sigma" textColor={active ? 'primary600' : textColor}>
        {children}
      </Typography>
    </BadgeWrapper>
  );
};

Badge.defaultProps = {
  active: false,
  backgroundColor: 'neutral100',
  textColor: 'neutral600',
};

Badge.propTypes = {
  active: PropTypes.bool,
  backgroundColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  textColor: PropTypes.string,
};
