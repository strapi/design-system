import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Portal } from '../Portal';
import { useIntersection } from '../helpers/useIntersection';

const position = (source, fullWidth) => {
  const rect = source.getBoundingClientRect();

  const left = rect.left + window.pageXOffset;
  const top = rect.top + rect.height + window.pageYOffset;

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

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral0};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral150};
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-right: 10px;
  }
`;

const PopoverContent = ({ source, children, spacingTop, fullWidth, onReachEnd, intersectionId, ...props }) => {
  const popoverRef = useRef(null);
  const { left, top, width } = position(source.current, fullWidth);

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
};

PopoverContent.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  intersectionId: PropTypes.string,
  onReachEnd: PropTypes.func,
  source: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  spacingTop: PropTypes.number,
};
