import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex } from '../Flex';
import { Typography } from '../Typography';

const Base = styled(Flex)`
  border-radius: ${({ theme, size }) => (size === 'S' ? '2px' : theme.borderRadius)};
  height: ${({ size, theme }) => theme.sizes.badge[size]};
`;

export const Badge = ({ active, size, textColor, backgroundColor, children, minWidth, ...props }) => {
  const paddingX = size === 'S' ? 1 : 2;

  return (
    <Base
      inline
      alignItem="center"
      justifyContent="center"
      minWidth={minWidth}
      paddingLeft={paddingX}
      paddingRight={paddingX}
      background={active ? 'primary200' : backgroundColor}
      size={size}
      {...props}
    >
      <Typography variant="sigma" textColor={active ? 'primary600' : textColor}>
        {children}
      </Typography>
    </Base>
  );
};

Badge.defaultProps = {
  active: false,
  backgroundColor: 'neutral150',
  minWidth: 5,
  size: 'M',
  textColor: 'neutral600',
};

Badge.propTypes = {
  /**
   * If `true`, it changes the `backgroundColor` to `primary200` and the `textColor` to `primary600`
   */
  active: PropTypes.bool,
  backgroundColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  minWidth: PropTypes.number,
  size: PropTypes.oneOf(['S', 'M']),
  textColor: PropTypes.string,
};
