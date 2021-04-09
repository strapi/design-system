const positionBottom = (tooltipRect, toggleSourceRect) => {};
const positionRight = (tooltipRect, toggleSourceRect) => {};
const positionLeft = (tooltipRect, toggleSourceRect) => {};
const positionTop = (tooltipRect, toggleSourceRect) => {
  const widthDifference = (tooltipRect.width - toggleSourceRect.width) / 2;
  const left = toggleSourceRect.left - widthDifference;
  const top = toggleSourceRect.top - tooltipRect.height - SPACE_BETWEEN + window.pageYOffset;

  return {
    left,
    top,
  };
};

const SPACE_BETWEEN = 8;

export const positionTooltip = (tooltipNode, toggleSourceNode, position) => {
  const tooltipRect = tooltipNode.getBoundingClientRect();
  const toggleSourceRect = toggleSourceNode.getBoundingClientRect();

  if (position === 'bottom') {
    return positionBottom(tooltipRect, toggleSourceRect);
  }

  if (position === 'right') {
    return positionRight(tooltipRect, toggleSourceRect);
  }

  if (position === 'left') {
    return positionLeft(tooltipRect, toggleSourceRect);
  }

  return positionTop(tooltipRect, toggleSourceRect);
};
