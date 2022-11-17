import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';

const ProgressbarBase = styled(Box)`
  &:before {
    background-color: ${({ theme }) => theme.colors.neutral0};
    border-radius: ${({ theme }) => theme.borderRadius};
    bottom: 0;
    content: '';
    position: absolute;
    top: 0;
    width: ${({ value }) => `${value}%`};
  }
`;

export const ProgressBar = ({ min, max, value, children, size, ...props }) => {
  return (
    <ProgressbarBase
      background="neutral600"
      hasRadius
      aria-label={children}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      height={size === 'S' ? 1 : 2}
      position="relative"
      role="progressbar"
      value={value}
      width={size === 'S' ? '78px' : '102px'}
      {...props}
    />
  );
};

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  size: 'M',
};

ProgressBar.propTypes = {
  children: PropTypes.node.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  size: PropTypes.oneOf(['S', 'M']),
  value: PropTypes.number,
};
