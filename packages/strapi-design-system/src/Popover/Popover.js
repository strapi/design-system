import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Portal } from '../Portal';
import { useIntersection } from '../helpers/useIntersection';
import { useResizeObserver } from '../helpers/useResizeObserver';

export const position = (source, popover, fullWidth, centered, spacing = 0) => {
  const rect = source.getBoundingClientRect();
  let top = rect.top + rect.height + window.pageYOffset + spacing;
  let left = rect.left + window.pageXOffset;

  if (!popover) {
    return {
      left,
      top,
      width: fullWidth ? rect.width : undefined,
    };
  }

  const popoverRect = popover.getBoundingClientRect();

  if (centered) {
    const popoverBorderPadding = 10;
    const popoverTotalWidth = popoverRect.width + popoverBorderPadding;
    const widthDifference = (rect.width - popoverTotalWidth) / 2;

    left = rect.left + widthDifference + window.pageXOffset;
  }

  // if popover overflows left or right viewport
  if (popoverRect.left < 0) {
    left = rect.left + window.pageXOffset;
  } else if (popoverRect.left + popoverRect.width > window.innerWidth) {
    left = window.innerWidth - popoverRect.width - 20;
  }

  const windowSizeAtPosition = window.innerHeight + window.pageYOffset;

  // if popover overflows bottom of viewport
  if (top + popoverRect.height + spacing > windowSizeAtPosition) {
    const popoverBorderPadding = 10;
    top = window.pageYOffset + rect.top - popoverRect.height - popoverBorderPadding - spacing;
  }

  return {
    left,
    top,
    width: fullWidth ? rect.width : undefined,
  };
};

const PopoverWrapper = styled(Box)`
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  position: absolute;
  z-index: 4;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background: ${({ theme }) => theme.colors.neutral0};
`;

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

const PopoverContent = ({ source, children, spacing, fullWidth, onReachEnd, intersectionId, centered, ...props }) => {
  const popoverRef = useRef(null);
  const [{ left, top, width }, setPosition] = useState(
    position(source.current, popoverRef.current, fullWidth, centered, spacing),
  );

  useResizeObserver([source, popoverRef], () =>
    setPosition(position(source.current, popoverRef.current, fullWidth, centered, spacing)),
  );
  useIntersection(popoverRef, onReachEnd, {
    selectorToWatch: `#${intersectionId}`,
    skipWhen: !intersectionId || !onReachEnd,
  });

  const style = {
    left: `${left}px`,
    top: `${top}px`,
    width: width ? `${width}px` : undefined,
  };

  return (
    <PopoverWrapper style={style} hasRadius background="neutral0" padding={1}>
      <PopoverScrollable ref={popoverRef} {...props}>
        {children}
        {intersectionId && onReachEnd && <div id={intersectionId} />}
      </PopoverScrollable>
    </PopoverWrapper>
  );
};

export const Popover = (props) => {
  return (
    <Portal>
      <PopoverContent {...props} />
    </Portal>
  );
};

const popoverDefaultProps = {
  fullWidth: false,
  intersectionId: undefined,
  onReachEnd: undefined,
  centered: false,
};

const popoverProps = {
  /**
   * Horizontally center the popover
   */
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  /**
   * Display full width popover
   */
  fullWidth: PropTypes.bool,
  /**
   * Element id to watch for the onReachEnd event
   */
  intersectionId: PropTypes.string,
  /**
   * The callback invoked after a scroll to the bottom of the popover content.
   */
  onReachEnd: PropTypes.func,
  /**
   * A React ref. Used to defined the position of the popover.
   */
  source: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  spacing: PropTypes.number,
};

PopoverContent.propTypes = popoverProps;
PopoverContent.defaultProps = popoverDefaultProps;
Popover.propTypes = popoverProps;
Popover.defaultProps = popoverDefaultProps;
