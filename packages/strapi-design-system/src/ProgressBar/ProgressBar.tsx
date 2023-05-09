import styled from 'styled-components';

import { Box, BoxProps } from '../Box';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export interface ProgressBarProps extends Omit<BoxProps, 'background' | 'hasRadius' | 'height' | 'position' | 'width'> {
  max?: IntRange<0, 101>;
  min?: IntRange<0, 101>;
  size?: 'S' | 'M';
  value?: IntRange<0, 101>;
}

const ProgressbarBase = styled(Box)<Required<Pick<ProgressBarProps, 'value'>>>`
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

export const ProgressBar = ({ min = 0, max = 100, value = 0, children, size = 'M', ...props }: ProgressBarProps) => {
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
