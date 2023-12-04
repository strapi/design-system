export const focusFocusable = (node: HTMLTableElement) => {
  const nextNode = node.querySelector('[tabindex="0"]') as HTMLTableCellElement | null;

  if (nextNode) {
    nextNode.focus();
  }
};
