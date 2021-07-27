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
`;

export const Loader = forwardRef(({ children, ...props }, ref) => {
  return (
    <div role="alert" aria-live="assertive" ref={ref} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <LoaderImg src={loaderSvg} aria-hidden={true} />
    </div>
  );
});

Loader.displayName = 'Loader';

Loader.propTypes = {
  children: PropTypes.string.isRequired,
};
