import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProgressBarSmall = styled.div`
  background: ${({ theme }) => theme.colors.neutral600};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;

  width: 78px;
  height: ${({ theme }) => theme.spaces[1]};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: ${({ theme }) => theme.borderRadius};
    width: ${({ value }) => `${value}%`};
    background: ${({ theme }) => theme.colors.neutral150};
  }
`;

const ProgressBarMedium = styled(ProgressBarSmall)`
  width: 102px;
  height: ${({ theme }) => theme.spaces[2]};
`;

export const ProgressBar = ({ min, max, value, children, size, ...props }) => {
  const sharedProps = {
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': min,
    'aria-valuemax': max,
  };

  if (size === 'M') {
    return <ProgressBarMedium {...sharedProps} value={value} aria-label={children} {...props} />;
  }

  return <ProgressBarSmall {...sharedProps} value={value} aria-label={children} {...props} />;
};

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  size: 'M',
};

ProgressBar.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['S', 'M']),
};
