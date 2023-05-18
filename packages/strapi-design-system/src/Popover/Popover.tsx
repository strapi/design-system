import * as React from 'react';

import { useFloating, flip, shift, offset, autoUpdate, Placement } from '@floating-ui/react-dom';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { useCallbackRef } from '@strapi/ui-primitives';
import { hideOthers } from 'aria-hidden';
import { RemoveScroll } from 'react-remove-scroll';
import styled from 'styled-components';

import { Box, BoxProps } from '../Box';
import { DismissibleLayer, DismissibleLayerProps } from '../DismissibleLayer';
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

interface ContentProps
  extends BoxProps<HTMLDivElement>,
    Pick<DismissibleLayerProps, 'onEscapeKeyDown' | 'onPointerDownOutside' | 'onDismiss'> {
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
  onEscapeKeyDown,
  onPointerDownOutside,
  onDismiss,
  ...props
}: ContentProps) => {
  const [content, setContent] = React.useState<HTMLDivElement | null>(null);
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

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  React.useEffect(() => {
    if (content) return hideOthers(content);
  }, [content]);

  const handleDismiss = useCallbackRef(onDismiss);

  React.useEffect(() => {
    const close = () => {
      handleDismiss();
    };
    window.addEventListener('blur', close);
    window.addEventListener('resize', close);

    return () => {
      window.removeEventListener('blur', close);
      window.removeEventListener('resize', close);
    };
  }, [handleDismiss]);

  const composedRefs = useComposedRefs<HTMLDivElement>((node) => setContent(node), floating);

  return (
    <RemoveScroll allowPinchZoom>
      <FocusScope
        asChild
        // we make sure we're not trapping once it's been closed
        // (closed !== unmounted when animating out)
        trapped
        onMountAutoFocus={(event) => {
          // we prevent open autofocus because we manually focus the selected item
          event.preventDefault();
        }}
        onUnmountAutoFocus={(event) => {
          source.current?.focus({ preventScroll: true });
          event.preventDefault();
        }}
      >
        <DismissibleLayer
          asChild
          disableOutsidePointerEvents
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          // When focus is trapped, a focusout event may still happen.
          // We make sure we don't trigger our `onDismiss` in such case.
          onFocusOutside={(event) => {
            event.preventDefault();
          }}
          onDismiss={onDismiss}
        >
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
        </DismissibleLayer>
      </FocusScope>
    </RemoveScroll>
  );
};

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

type PopoverProps = ScrollingProps &
  Pick<
    ContentProps,
    | 'source'
    | 'spacing'
    | 'fullWidth'
    | 'placement'
    | 'centered'
    | 'onEscapeKeyDown'
    | 'onPointerDownOutside'
    | 'onDismiss'
  >;

export const Popover = ({
  children,
  source,
  spacing,
  fullWidth,
  placement,
  centered,
  onEscapeKeyDown,
  onPointerDownOutside,
  onDismiss,
  ...restProps
}: PopoverProps) => {
  return (
    <Portal>
      <Content
        source={source}
        spacing={spacing}
        fullWidth={fullWidth}
        placement={placement}
        centered={centered}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onDismiss={onDismiss}
      >
        <Scrolling {...restProps}>{children}</Scrolling>
      </Content>
    </Portal>
  );
};
