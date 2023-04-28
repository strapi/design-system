import * as React from 'react';

import { useFloating, flip, shift, offset, autoUpdate, Placement } from '@floating-ui/react-dom';
import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { stripReactIdOfColon } from '../helpers/strings';
import { useComposedRefs } from '../hooks/useComposeRefs';
import { useId } from '../hooks/useId';
import { useIntersection } from '../hooks/useIntersection';
import { Portal } from '../Portal';

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
  z-index: ${({ theme }) => theme.zIndices[0]};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background: ${({ theme }) => theme.colors.neutral0};
`;

export interface ContentProps extends BoxProps<HTMLDivElement> {
  source: React.MutableRefObject<HTMLElement>;
  placement?: Placement;
  fullWidth?: boolean;
  centered?: boolean;
  spacing?: number;
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  (
    { source, children, spacing = 0, fullWidth = false, placement = 'bottom-start', centered = false, ...props },
    forwardedRef,
  ) => {
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

    const composedRefs = useComposedRefs(forwardedRef, floating);

    return (
      <PopoverWrapper
        ref={composedRefs}
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
  },
);

export interface ScrollingProps extends BoxProps<HTMLDivElement> {
  intersectionId?: string;
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
}

export const Scrolling = ({ children, intersectionId, onReachEnd, ...props }: ScrollingProps) => {
  const popoverRef = React.useRef<HTMLDivElement>(null!);

  const generatedIntersectionId = useId();
  useIntersection(popoverRef, onReachEnd ?? (() => {}), {
    selectorToWatch: `#${stripReactIdOfColon(generatedIntersectionId)}`,
    skipWhen: !intersectionId || !onReachEnd,
  });

  return (
    <PopoverScrollable ref={popoverRef} {...props}>
      {children}
      {intersectionId && onReachEnd && (
        <Box id={stripReactIdOfColon(generatedIntersectionId)} width="100%" height="1px" />
      )}
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
