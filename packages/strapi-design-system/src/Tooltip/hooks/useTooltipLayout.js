import { useRef, useLayoutEffect } from 'react';
import { positionTooltip } from '../utils/positionTooltip';

export const useTooltipLayout = (visible, position) => {
  const tooltipWrapperRef = useRef(null);
  const toggleSourceRef = useRef(null);

  useLayoutEffect(() => {
    if (visible) {
      const tooltip = tooltipWrapperRef.current;
      const toggleSource = toggleSourceRef.current;

      const tooltipPosition = positionTooltip(tooltip, toggleSource, position);

      tooltip.style.left = `${tooltipPosition.left}px`;
      tooltip.style.top = `${tooltipPosition.top}px`;
    }
  }, [position, visible]);

  return { tooltipWrapperRef, toggleSourceRef };
};
