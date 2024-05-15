import * as React from 'react';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { styled } from 'styled-components';

type ScrollAreaElement = HTMLDivElement;
type ScrollAreaViewportElement = HTMLDivElement;

interface ScrollAreaProps extends Omit<ScrollArea.ScrollAreaProps, 'asChild'> {
  /**
   * @description This ref is attatched specifically to the viewport,
   * not the container of the viewport & scrollbars.
   */
  viewportRef?: React.Ref<ScrollAreaViewportElement>;
}

const ScrollAreaImpl = React.forwardRef<ScrollAreaElement, ScrollAreaProps>(
  ({ children, viewportRef, ...restProps }, forwardedRef) => {
    return (
      <ScrollAreaRoot ref={forwardedRef} {...restProps}>
        <ScrollAreaViewport ref={viewportRef}>{children}</ScrollAreaViewport>
        <Scrollbar orientation="vertical">
          <Thumb />
        </Scrollbar>
        <Scrollbar orientation="horizontal">
          <Thumb />
        </Scrollbar>
      </ScrollAreaRoot>
    );
  },
);

const ScrollAreaRoot = styled(ScrollArea.Root)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ScrollAreaViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  padding-inline-end: 4px;
`;

const Scrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;

  &[data-orientation='vertical'] {
    width: 0.4rem;
  }

  &[data-orientation='horizontal'] {
    flex-direction: column;
    height: 0.4rem;
  }
`;

const Thumb = styled(ScrollArea.Thumb)`
  position: relative;
  flex: 1;
  background-color: ${(props) => props.theme.colors.neutral150};
  border-radius: var(--scrollbar-size);

  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;

export { ScrollAreaImpl as ScrollArea };
export type { ScrollAreaProps, ScrollAreaElement, ScrollAreaViewportElement };
