import * as React from 'react';
import styled from 'styled-components';
import { useFloating, flip, shift, offset, autoUpdate, Placement } from '@floating-ui/react-dom';

import { Box, BoxProps } from '../Box';
import { Portal } from '../Portal';

import { useIntersection } from '../helpers/useIntersection';

export const POPOVER_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
] as const;

const PopoverWrapper = styled(Box)`
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  z-index: 4;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background: ${({ theme }) => theme.colors.neutral0};
`;

interface ContentProps extends BoxProps<HTMLDivElement> {
  source: React.MutableRefObject<HTMLElement>;
  placement?: Placement;
  fullWidth?: boolean;
  centered?: boolean;
  spacing?: number;
}

export const Content = ({
  source,
  children,
  spacing = 0,
  fullWidth = false,
  placement = 'bottom-start',
  centered = false,
  ...props
}: ContentProps) => {
  const [width, setWidth] = React.useState<number | undefined>(undefined);
  const { x, y, reference, floating, strategy } = useFloating({
    strategy: 'fixed',
    placement: centered ? 'bottom' : placement,
    middleware: [
      offset({
        mainAxis: spacing,
      }),
      shift(),
      flip(),
    ],
    whileElementsMounted: autoUpdate,
  });

  React.useLayoutEffect(() => {
    reference(source.current);
  }, [source, reference]);

  React.useLayoutEffect(() => {
    if (fullWidth) {
      setWidth(source.current.offsetWidth);
    }
  }, [fullWidth, source]);

  return (
    <PopoverWrapper
      ref={floating}
      style={{
        left: x,
        top: y,
        position: strategy,
        width: width || undefined,
      }}
      hasRadius
      background="neutral0"
      padding={1}
      {...props}
    >
      {children}
    </PopoverWrapper>
  );
};

export interface ScrollingProps extends BoxProps<HTMLDivElement> {
  intersectionId?: string;
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
}

const Scrolling = ({ children, intersectionId, onReachEnd, ...props }: ScrollingProps) => {
  const popoverRef = React.useRef<HTMLDivElement>(null!);

  useIntersection(popoverRef, onReachEnd ?? (() => {}), {
    selectorToWatch: `#${intersectionId}`,
    skipWhen: !intersectionId || !onReachEnd,
  });

  return (
    <PopoverScrollable ref={popoverRef} {...props}>
      {children}
      {intersectionId && onReachEnd && <Box id={intersectionId} width="100%" height="1px" />}
    </PopoverScrollable>
  );
};

const PopoverScrollable = styled(Box)`
  // 16 is base base size, 3 is the factor to get closer to 40px and 5 is the number of elements visible in the list
  max-height: ${3 * 5}rem;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral0};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral150};
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-right: 10px;
  }
`;

type PopoverProps = ScrollingProps & Pick<ContentProps, 'source' | 'spacing' | 'fullWidth' | 'placement' | 'centered'>;

export const Popover = ({ children, source, spacing, fullWidth, placement, centered, ...restProps }: PopoverProps) => {
  return (
    <Portal>
      <Content source={source} spacing={spacing} fullWidth={fullWidth} placement={placement} centered={centered}>
        <Scrolling {...restProps}>{children}</Scrolling>
      </Content>
    </Portal>
  );
};
