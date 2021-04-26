import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { Portal } from '../Portal';
import { useTooltipHandlers } from './hooks/useTooltipHandlers';
import { useTooltipLayout } from './hooks/useTooltipLayout';
import { useId } from '../helpers/useId';

const TooltipWrapper = styled(Box)`
  position: absolute;
  display: ${({ visible }) => (visible ? 'revert' : 'none')};
`;

export const Tooltip = ({ children, content, delay, position, ...props }) => {
  const tooltipId = useId('tooltip');
  const { visible, ...tooltipHandlers } = useTooltipHandlers(delay);
  const { tooltipWrapperRef, toggleSourceRef } = useTooltipLayout(visible, position);

  const childrenClone = React.cloneElement(children, {
    ref: toggleSourceRef,
    tabIndex: 0,
    'aria-describedby': visible ? tooltipId : undefined,
    ...tooltipHandlers,
  });

  return (
    <>
      <Portal>
        <TooltipWrapper
          id={tooltipId}
          background="neutral900"
          hasRadius
          padding={2}
          role="tooltip"
          ref={tooltipWrapperRef}
          visible={visible}
          {...props}
        >
          <Text small={true} highlighted={true} textColor="neutral0">
            {content}
          </Text>
        </TooltipWrapper>
      </Portal>

      {childrenClone}
    </>
  );
};

Tooltip.defaultProps = {
  delay: 500,
  position: 'top',
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  delay: PropTypes.number,
  position: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
};
