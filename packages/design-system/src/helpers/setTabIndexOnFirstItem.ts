export const setTabIndexOnFirstItem = (node: HTMLElement, selector: string) => {
  const list = node.querySelectorAll(selector);

  if (list && list.length > 0) {
    list.item(0).setAttribute('tabindex', '0');
  }
};
