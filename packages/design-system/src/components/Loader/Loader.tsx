import * as React from 'react';

import { styled, keyframes } from 'styled-components';

import { PropsToTransientProps } from '../../types';
import { VisuallyHidden } from '../../utilities/VisuallyHidden';

import loaderSvg from './assets/loader.svg';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  small?: boolean;
}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(({ children, small = false, ...props }, ref) => {
  return (
    <div role="alert" aria-live="assertive" ref={ref} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <LoaderImg aria-hidden $small={small} />
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

const LoaderImg = styled.div<PropsToTransientProps<Required<Pick<LoaderProps, 'small'>>>>`
  width: 63px;
  height: 63px;
  background-color: ${({ theme }) => theme.colors.primary600};
  mask-image: url(${loaderSvg});
  mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-image: url(${loaderSvg});
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  animation: ${rotation} 1s infinite linear;
  will-change: transform;
  ${({ $small, theme }) => $small && `width: ${theme.spaces[6]}; height: ${theme.spaces[6]};`}
`;
