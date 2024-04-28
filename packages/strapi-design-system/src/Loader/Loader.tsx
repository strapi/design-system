import * as React from 'react';

import { styled, keyframes } from 'styled-components';

import loaderSvg from './assets/loader.svg';
import { PropsToTransientProps } from '../types';
import { VisuallyHidden } from '../VisuallyHidden';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  small?: boolean;
}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(({ children, small = false, ...props }, ref) => {
  return (
    <div role="alert" aria-live="assertive" ref={ref} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <LoaderImg src={loaderSvg} aria-hidden $small={small} />
    </div>
  );
});

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoaderImg = styled.img<PropsToTransientProps<Required<Pick<LoaderProps, 'small'>>>>`
  animation: ${rotation} 1s infinite linear;
  will-change: transform;
  ${({ $small, theme }) => $small && `width: ${theme.spaces[6]}; height: ${theme.spaces[6]};`}
`;
