import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

export const Badge = ({ active, textColor, backgroundColor, children, minWidth, ...props }) => {
  return (
    <Flex
      inline
      alignItem="center"
      justifyContent="center"
      minWidth={minWidth}
      padding={1}
      background={active ? 'primary100' : backgroundColor}
      hasRadius
      {...props}
    >
      <Typography variant="sigma" textColor={active ? 'primary600' : textColor}>
        {children}
      </Typography>
    </Flex>
  );
};

Badge.defaultProps = {
  active: false,
  backgroundColor: 'neutral100',
  minWidth: 5,
  textColor: 'neutral600',
};

Badge.propTypes = {
  active: PropTypes.bool,
  backgroundColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  minWidth: PropTypes.number,
  textColor: PropTypes.string,
};
