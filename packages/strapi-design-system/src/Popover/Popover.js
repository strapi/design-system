import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Portal } from '../Portal';

const position = (source) => {
  const rect = source.getBoundingClientRect();

  const left = rect.left + window.pageXOffset;
  const top = rect.top + rect.height + window.pageYOffset;

  return {
    left,
    top,
  };
};

const PopoverWrapper = styled(Box)`
  // TODO: use the one in the theme when it's available
  box-shadow: 0px 1px 4px rgba(33, 33, 52, 0.1);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background: ${({ theme }) => theme.colors.neutral0};
`;

const PopoverScrollable = styled(Box)`
  // 16 is base base size, 3 is the factor to get closer to 40px and 5 is the number of elements visible in the list
  max-height: ${3 * 5}rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.spaces[1]};
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

export const Popover = ({ source, visible, children, ...props }) => {
  const popoverRef = useRef(null);

  useLayoutEffect(() => {
    if (visible) {
      const popover = popoverRef.current;
      const { left, top } = position(source.current);

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    }
  }, [visible]);

  return (
    <Portal>
      <PopoverWrapper ref={popoverRef} hasRadius background="neutral0" visible={visible} padding={1}>
        <PopoverScrollable paddingRight={1} {...props}>
          {children}
        </PopoverScrollable>
      </PopoverWrapper>
    </Portal>
  );
};

Popover.displayName = Popover;

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  source: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  visible: PropTypes.bool.isRequired,
};
