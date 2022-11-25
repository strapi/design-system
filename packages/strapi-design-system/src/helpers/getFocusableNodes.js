/**
 * Sometimes, we want to retrieve the elements with tabindex=-1, and sometime we don't
 * The includeNegativeTabIndex aims to provide this capability
 *
 * @param {HTMLElement} node HTMLElement
 * @param {boolean} includeNegativeTabIndex boolean
 * @returns {HTMLElement[]} HTMLElement[]
 */
export const getFocusableNodes = (node, includeNegativeTabIndex) => {
  const nodes = [
    ...node.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'),
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
 * @param {HTMLElement[]} nodes HTMLElement[]
 */
export const getFocusableNodesWithKeyboardNav = (nodes) => {
  return nodes.filter((node) => {
    if (node.tagName === 'INPUT') {
      return node.type !== 'checkbox' && node.type !== 'radio';
    }

    return false;
  });
};
