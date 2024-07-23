export const focusFocusable = (node) => {
  const nextNode = node.querySelector('[tabindex="0"]');

  if (nextNode) {
    nextNode.focus();
  }
};
