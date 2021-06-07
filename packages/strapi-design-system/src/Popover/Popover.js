import React from 'react';
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

export const Popover = ({ source, children, spacingTop, ...props }) => {
  const { left, top } = position(source.current);

  const style = {
    left: `${left}px`,
    top: `${top}px`,
  };

  return (
    <Portal>
      <PopoverWrapper style={style} hasRadius background="neutral0" padding={1} spacingTop={spacingTop}>
        <PopoverScrollable {...props}>{children}</PopoverScrollable>
      </PopoverWrapper>
    </Portal>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  source: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  spacingTop: PropTypes.number,
};
