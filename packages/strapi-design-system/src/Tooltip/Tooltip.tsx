import * as React from 'react';

import styled from 'styled-components';

import { useTooltipHandlers } from './hooks/useTooltipHandlers';
import { useTooltipLayout } from './hooks/useTooltipLayout';
import { TooltipPosition } from './utils/positionTooltip';
import { Box, BoxProps } from '../Box';
import { useId } from '../hooks/useId';
import { Portal } from '../Portal';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const TooltipWrapper = styled(Box)<{ visible: boolean }>`
  /* z-index exist because of its position inside Modals */
  z-index: 4;
  display: ${({ visible }) => (visible ? 'revert' : 'none')};
`;

export interface TooltipProps extends Omit<BoxProps<'div'>, 'position'> {
  description?: string;
  delay?: number;
  id?: string;
  label?: React.ReactNode;
  position?: TooltipPosition;
}

export const Tooltip = ({
  children,
  label,
  description,
  delay = 500,
  position = 'top',
  id,
  ...props
}: TooltipProps) => {
  const tooltipId = useId(id);
  const descriptionId = useId();
  const { visible, ...tooltipHandlers } = useTooltipHandlers(delay);
  const { tooltipWrapperRef, toggleSourceRef } = useTooltipLayout(visible, position);

  const childrenClone = React.cloneElement(children as React.ReactElement, {
    tabIndex: 0,
    'aria-labelledby': label ? tooltipId : undefined,
    'aria-describedby': description ? tooltipId : undefined,
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
          position="absolute"
          {...props}
        >
          {visible && <VisuallyHidden id={descriptionId}>{description}</VisuallyHidden>}
          <Typography as="p" variant="pi" fontWeight="bold" textColor="neutral0">
            {label || description}
          </Typography>
        </TooltipWrapper>
      </Portal>

      <span ref={toggleSourceRef}>{childrenClone}</span>
    </>
  );
};
