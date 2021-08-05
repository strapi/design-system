const SPACE_BETWEEN = 8;

const positionBottom = (tooltipRect, toggleSourceRect) => {
  const widthDifference = (tooltipRect.width - toggleSourceRect.width) / 2;
  const left = toggleSourceRect.left - widthDifference;
  const top = toggleSourceRect.top + toggleSourceRect.height + SPACE_BETWEEN + window.pageYOffset;

  return {
    left,
    top,
  };
};

const positionRight = (tooltipRect, toggleSourceRect) => {
  const heightDifference = (tooltipRect.height - toggleSourceRect.height) / 2;
  const left = toggleSourceRect.left + toggleSourceRect.width + SPACE_BETWEEN;
  const top = toggleSourceRect.top - heightDifference + window.pageYOffset;

  return { left, top };
};

const positionLeft = (tooltipRect, toggleSourceRect) => {
  const heightDifference = (tooltipRect.height - toggleSourceRect.height) / 2;
  const left = toggleSourceRect.left - tooltipRect.width - SPACE_BETWEEN;
  const top = toggleSourceRect.top - heightDifference + window.pageYOffset;

  return { left, top };
};

const positionTop = (tooltipRect, toggleSourceRect) => {
  const widthDifference = (tooltipRect.width - toggleSourceRect.width) / 2;
  let left = toggleSourceRect.left - widthDifference;
  let top = toggleSourceRect.top - tooltipRect.height - SPACE_BETWEEN + window.pageYOffset;

  // console.log('window.innerWidth', window.innerWidth);
  // console.log('toggleSourceRect.width + toggleSourceRect.left', toggleSourceRect.width + toggleSourceRect.left);

  //handle overflow top and left viewport situations
  if (top < 0 && left < 0) {
    left = toggleSourceRect.width + toggleSourceRect.left + SPACE_BETWEEN;
    top = toggleSourceRect.height / 2;
  } else if (top < 0 && left > 0) {
    top = toggleSourceRect.height + tooltipRect.height / 2 + SPACE_BETWEEN;
  }

  return {
    left,
    top,
  };
};

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
