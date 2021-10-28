/**
 * Sometimes, we want to retrieve the elements with tabindex=-1, and sometime we don't
 * The includeNegativeTabIndex aims to provide this capability
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
