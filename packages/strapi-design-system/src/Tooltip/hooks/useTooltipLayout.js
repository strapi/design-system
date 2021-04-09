import { useRef, useLayoutEffect } from 'react';

export const useTooltipLayout = (visible) => {
  const tooltipWrapperRef = useRef(null);
  const toggleSourceRef = useRef(null);

  useLayoutEffect(() => {
    if (visible) {
      const tooltip = tooltipWrapperRef.current;
      const toggleSource = toggleSourceRef.current;

      const tooltipRect = tooltip.getBoundingClientRect();
      const toggleSourceRect = toggleSource.getBoundingClientRect();

      const widthDifference = (tooltipRect.width - toggleSourceRect.width) / 2;
      const nextLeft = toggleSourceRect.x - widthDifference;
      const nextTop = toggleSourceRect.y - tooltipRect.height - 8;

      tooltip.style.left = `${nextLeft}px`;
      tooltip.style.top = `${nextTop}px`;
    }
  }, [visible]);

  return { tooltipWrapperRef, toggleSourceRef };
};
