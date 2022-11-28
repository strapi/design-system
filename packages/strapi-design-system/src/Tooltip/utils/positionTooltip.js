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

  // CONDITIONS TO HANDLE TOOLTIP OVERFLOW OUT OF VIEWPORT

  // calculate the space between rightside viewport to rightside source element
  // knowing this space will help calculate if tooltip will overflow right side
  const rightSpaceDifference = window.innerWidth - toggleSourceRect.right;

  // calculate rightside pos of tooltip to compare later to window.innerWidth
  const overflowRight = toggleSourceRect.left + tooltipRect.width - rightSpaceDifference;

  if (overflowRight > window.innerWidth) {
    // if tooltip overflow right side of viewport
    // place tooltip left side from source element
    left = toggleSourceRect.left - tooltipRect.width - SPACE_BETWEEN;
    top = toggleSourceRect.top + window.scrollY - toggleSourceRect.height / 2;
  } else if (left < 0) {
    // if overflow left
    // place tooltip right side from source element
    left = toggleSourceRect.width + toggleSourceRect.left + SPACE_BETWEEN;
    top = toggleSourceRect.top + window.scrollY - tooltipRect.height / 2 + SPACE_BETWEEN;
  } else if (top < 0 && left > 0) {
    // if overflow top but not left
    // place tooltip below source element
    top = toggleSourceRect.top + toggleSourceRect.height + SPACE_BETWEEN;
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
