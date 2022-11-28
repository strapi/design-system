import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { VisuallyHidden } from '../VisuallyHidden';
import loaderSvg from './assets/loader.svg';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoaderImg = styled.img`
  animation: ${rotation} 1s infinite linear;
  will-change: transform;
  ${({ small, theme }) => small && `width: ${theme.spaces[6]}; height: ${theme.spaces[6]};`}
`;

export const Loader = forwardRef(({ children, small, ...props }, ref) => {
  return (
    <div role="alert" aria-live="assertive" ref={ref} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <LoaderImg src={loaderSvg} aria-hidden small={small} />
    </div>
  );
});

Loader.displayName = 'Loader';

Loader.defaultProps = {
  small: false,
};

Loader.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool,
};
