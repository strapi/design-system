/**
 * Sometimes, we want to retrieve the elements with tabindex=-1, and sometime we don't
 * The includeNegativeTabIndex aims to provide this capability
 *
 */
export const getFocusableNodes = (node: HTMLElement, includeNegativeTabIndex?: boolean): HTMLElement[] => {
  const nodes = [
    ...node.querySelectorAll<HTMLElement>(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    ),
  ];
  const focusables = nodes.filter((node) => {
    if (node.hasAttribute('disabled')) return false;

    if (includeNegativeTabIndex) return true;

    return node.getAttribute('tabindex') !== '-1';
  });

  return focusables;
};

/**
 * This function filters an array of HTMLElements and returns any of them that have internal keyboard navigation such as input type="text"
 */
export const getFocusableNodesWithKeyboardNav = (nodes: HTMLElement[]) => {
  return nodes.filter((node) => {
    if (node.tagName === 'INPUT') {
      return (node as HTMLInputElement).type !== 'checkbox' && (node as HTMLInputElement).type !== 'radio';
    }

    return false;
  });
};
