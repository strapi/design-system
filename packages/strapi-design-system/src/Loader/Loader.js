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
  ${({ small }) => small && `width: 25px; height: 25px;`}
`;

export const Loader = forwardRef(({ children, small, ...props }, ref) => {
  return (
    <div role="alert" aria-live="assertive" ref={ref} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <LoaderImg src={loaderSvg} aria-hidden={true} small={small} />
    </div>
  );
});

Loader.displayName = 'Loader';

Loader.defaultProps = {
  small: false,
};

Loader.propTypes = {
  children: PropTypes.string.isRequired,
  small: PropTypes.bool,
};
