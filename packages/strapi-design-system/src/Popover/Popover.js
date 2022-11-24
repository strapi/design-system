import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFloating, flip, shift, offset, autoUpdate } from '@floating-ui/react-dom';

import { Box } from '../Box';
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
];

const PopoverWrapper = styled(Box)`
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
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

const PopoverContent = ({
  source,
  children,
  spacing,
  fullWidth,
  placement,
  onReachEnd,
  intersectionId,
  centered,
  ...props
}) => {
  const popoverRef = React.useRef(null);
  const [width, setWidth] = React.useState(undefined);
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

  useIntersection(popoverRef, onReachEnd, {
    selectorToWatch: `#${intersectionId}`,
    skipWhen: !intersectionId || !onReachEnd,
  });

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
    >
      <PopoverScrollable ref={popoverRef} {...props}>
        {children}
        {intersectionId && onReachEnd && <Box id={intersectionId} width="100%" height="1px" />}
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
  placement: 'bottom-start',
  spacing: 0,
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
   * The popover position
   */
  placement: PropTypes.oneOf(POPOVER_PLACEMENTS),
  /**
   * A React ref. Used to defined the position of the popover.
   */
  source: PropTypes.shape({
    current: (typeof Element === 'undefined' ? PropTypes.any : PropTypes.instanceOf(Element)).isRequired,
  }).isRequired,
  spacing: PropTypes.number,
};

PopoverContent.propTypes = popoverProps;
PopoverContent.defaultProps = popoverDefaultProps;
Popover.propTypes = popoverProps;
Popover.defaultProps = popoverDefaultProps;
