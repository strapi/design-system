import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as RadixPopover from '@radix-ui/react-popover';

import { useIntersection } from '../helpers/useIntersection';

import { Box } from '../Box';

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

export const Content = ({ children, onReachEnd, intersectionId, className, align, spacing, ...props }) => {
  const popoverRef = React.useRef(null);

  useIntersection(popoverRef, onReachEnd, {
    selectorToWatch: `#${intersectionId}`,
    skipWhen: !intersectionId || !onReachEnd,
  });

  return (
    <RadixPopover.Portal>
      <RadixPopover.Content asChild align={align} sideOffset={spacing}>
        <PopoverWrapper className={className} hasRadius background="neutral0" padding={1}>
          <PopoverScrollable ref={popoverRef} {...props}>
            {children}
            {intersectionId && onReachEnd && <Box id={intersectionId} width="100%" height="1px" />}
          </PopoverScrollable>
        </PopoverWrapper>
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
};

Content.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Element id to watch for the onReachEnd event
   */
  intersectionId: PropTypes.string,
  /**
   * The callback invoked after a scroll to the bottom of the popover content.
   */
  onReachEnd: PropTypes.func,
  spacing: PropTypes.number,
};

Content.defaultProps = {
  intersectionId: undefined,
  onReachEnd: undefined,
};

export const Root = RadixPopover.Root;

/**
 * Wraps your popover button and by default merges the props of the RadixTrigger
 * with that of your button to avoid too many changes to your components.
 */
export const Trigger = ({ asChild, children }) => (
  <RadixPopover.Trigger asChild={asChild}>{children}</RadixPopover.Trigger>
);

Trigger.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Trigger.defaultProps = {
  asChild: true,
};
