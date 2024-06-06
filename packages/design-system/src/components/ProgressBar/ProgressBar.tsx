import * as React from 'react';

import * as Progress from '@radix-ui/react-progress';
import { styled } from 'styled-components';

type Size = 'S' | 'M';

interface ProgressBarProps extends Progress.ProgressProps {
  children?: string;
  size?: Size;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ size = 'M', value, ...restProps }, forwardedRef) => {
    return (
      <ProgressRoot ref={forwardedRef} $size={size} {...restProps}>
        <ProgressIndicator style={{ transform: `translate3D(-${100 - (value ?? 0)}%, 0, 0)` }} />
      </ProgressRoot>
    );
  },
);

const ProgressRoot = styled(Progress.Root)<{ $size: Size }>`
  position: relative;
  overflow: hidden;
  width: ${(props) => (props.$size === 'S' ? '7.8rem' : '10.2rem')};
  height: ${(props) => (props.$size === 'S' ? '0.4rem' : '0.8rem')};
  background-color: ${(props) => props.theme.colors.neutral600};
  border-radius: ${(props) => props.theme.borderRadius};

  /* Fix overflow clipping in Safari */
  /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
  transform: translateZ(0);
`;

const ProgressIndicator = styled(Progress.Indicator)`
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  height: 100%;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${(props) => props.theme.motion.timings['320']}
      ${(props) => props.theme.motion.easings.authenticMotion};
  }
`;

export { ProgressBar };
export type { ProgressBarProps, Size as ProgressBarSize };
