import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { VisuallyHidden } from '../VisuallyHidden';
import LoaderSvg from './LoaderSvg';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoaderImg = styled(LoaderSvg)`
  animation: ${rotation} 1s infinite linear;
  ${({ small }) => small && `width: 25px; height: 25px;`}
  path {
    fill: ${({ color, theme }) => theme.colors[color]};
  }
`;

export const Loader = forwardRef(({ children, small, color, ...props }, ref) => {
  return (
    <div role="alert" aria-live="assertive" ref={ref} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <LoaderImg small={small} color={color} />
    </div>
  );
});

Loader.displayName = 'Loader';

Loader.defaultProps = {
  small: false,
  color: 'primary600',
};

Loader.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  small: PropTypes.bool,
};
