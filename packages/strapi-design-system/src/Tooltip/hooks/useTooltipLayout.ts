import { useRef, useLayoutEffect } from 'react';

import { positionTooltip, TooltipPosition } from '../utils/positionTooltip';

export const useTooltipLayout = (visible: boolean, position: TooltipPosition) => {
  const tooltipWrapperRef = useRef<HTMLDivElement | null>(null);
  const toggleSourceRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (visible) {
      const tooltip = tooltipWrapperRef.current;
      const toggleSource = toggleSourceRef.current;

      if (tooltip && toggleSource) {
        const tooltipPosition = positionTooltip(tooltip, toggleSource, position);

        tooltip.style.left = `${tooltipPosition.left}px`;
        tooltip.style.top = `${tooltipPosition.top}px`;
      }
    }
  }, [position, visible]);

  return { tooltipWrapperRef, toggleSourceRef };
};
