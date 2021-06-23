const resetTabIndex = (nodes) => {
  nodes.forEach((node) => node.setAttribute('tabindex', -1));
};

const getFocusedLeafIndex = (nodes) => {
  let focusedIndex;

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] === document.activeElement) {
      focusedIndex = i;
    }
  }

  return focusedIndex;
};

export const focusNextLeaf = (domTree) => {
  const focusableLeafs = domTree.querySelectorAll('[role="treeitem"] > [tabindex]');
  const focusedIndex = getFocusedLeafIndex(focusableLeafs);

  if (focusedIndex !== undefined) {
    const nextLeaf = focusableLeafs[focusedIndex + 1];

    if (nextLeaf) {
      resetTabIndex(focusableLeafs);
      nextLeaf.setAttribute('tabindex', 0);
      nextLeaf.focus();
    }
  }
};

export const focusPreviousLeaf = (domTree) => {
  const focusableLeafs = domTree.querySelectorAll('[role="treeitem"] > [tabindex]');
  const focusedIndex = getFocusedLeafIndex(focusableLeafs);

  if (focusedIndex !== undefined) {
    const nextLeaf = focusableLeafs[focusedIndex - 1];

    if (nextLeaf) {
      resetTabIndex(focusableLeafs);
      nextLeaf.setAttribute('tabindex', 0);
      nextLeaf.focus();
    }
  }
};
