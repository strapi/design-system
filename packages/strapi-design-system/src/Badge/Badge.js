import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex } from '../Flex';
import { Typography } from '../Typography';

const Base = styled(Flex)`
  border-radius: 2px;
  height: ${16 / 16}rem;
`;

export const Badge = ({ active, textColor, backgroundColor, children, minWidth, ...props }) => {
  return (
    <Base
      inline
      alignItem="center"
      justifyContent="center"
      minWidth={minWidth}
      paddingLeft={1}
      paddingRight={1}
      background={active ? 'primary200' : backgroundColor}
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
  textColor: PropTypes.string,
};
