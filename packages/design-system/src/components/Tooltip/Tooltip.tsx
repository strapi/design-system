import * as React from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';
import { keyframes, styled } from 'styled-components';

import { Typography } from '../Typography';

type TooltipElement = HTMLDivElement;

interface TooltipProps extends Tooltip.TooltipContentProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened. This will
   * override the prop with the same name passed to Provider.
   * @default 500
   */
  delayDuration?: number;
  /**
   * @deprecated Use `label` instead.
   */
  description?: string;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @default false
   */
  disableHoverableContent?: boolean;
  label?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

const TooltipImpl = React.forwardRef<TooltipElement, TooltipProps>(
  (
    {
      children,
      description,
      label,
      defaultOpen,
      open,
      onOpenChange,
      delayDuration = 500,
      disableHoverableContent,
      ...restProps
    },
    forwardedRef,
  ) => {
    return (
      <Tooltip.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
      >
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent ref={forwardedRef} sideOffset={8} {...restProps}>
            <Typography variant="pi" fontWeight="bold">
              {label || description}
            </Typography>
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    );
  },
);

const scaleIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const TooltipContent = styled(Tooltip.Content)`
  background-color: ${(props) => props.theme.colors.neutral900};
  color: ${(props) => props.theme.colors.neutral0};
  padding-inline: ${(props) => props.theme.spaces[2]};
  padding-block: ${(props) => props.theme.spaces[2]};
  border-radius: ${(props) => props.theme.borderRadius};
  will-change: opacity;
  transform-origin: var(--radix-tooltip-content-transform-origin);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${scaleIn} 200ms ${(props) => props.theme.easings.authenticMotion};
  }
`;

export { TooltipImpl as Tooltip };
export type { TooltipProps, TooltipElement };
