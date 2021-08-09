import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Portal } from '../Portal';
import { useIntersection } from '../helpers/useIntersection';
import { useResizeObserver } from '../helpers/useResizeObserver';

export const position = (source, popover, fullWidth, centered) => {
  const rect = source.getBoundingClientRect();
  let top = rect.top + rect.height + window.pageYOffset;
  let left = rect.left + window.pageXOffset;

  if (centered) {
    left = rect.left - rect.width / 2 + window.pageXOffset;
  }

  if (!popover) {
    return {
      left,
      top,
      width: fullWidth ? rect.width : undefined,
    };
  }

  const popoverRect = popover.getBoundingClientRect();
  //if popover overflows left or right viewport
  if (popoverRect.left < 0) {
    left = rect.left + window.pageXOffset;
  } else if (popoverRect.left + popoverRect.width > window.innerWidth) {
    left = window.innerWidth - popoverRect.width - 20;
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
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background: ${({ theme }) => theme.colors.neutral0};
  margin-top: ${({ theme, spacingTop }) => theme.spaces[spacingTop]};
`;

const PopoverScrollable = styled(Box)`
  // 16 is base base size, 3 is the factor to get closer to 40px and 5 is the number of elements visible in the list
  max-height: ${3 * 5}rem;
  overflow-y: scroll;

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

const PopoverContent = ({
  source,
  children,
  spacingTop,
  fullWidth,
  onReachEnd,
  intersectionId,
  centered,
  ...props
}) => {
  const popoverRef = useRef(null);
  const [{ left, top, width }, setPosition] = useState(
    position(source.current, popoverRef.current, fullWidth, centered),
  );

  useResizeObserver(source, () => setPosition(position(source.current, popoverRef.current, fullWidth, centered)));
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
    <PopoverWrapper style={style} hasRadius background="neutral0" padding={1} spacingTop={spacingTop}>
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

PopoverContent.defaultProps = {
  fullWidth: false,
  intersectionId: undefined,
  onReachEnd: undefined,
  centered: false,
};

PopoverContent.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  intersectionId: PropTypes.string,
  onReachEnd: PropTypes.func,
  source: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  spacingTop: PropTypes.number,
  centered: PropTypes.bool,
};
