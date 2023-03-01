import { ReactElement } from 'react';

import computeScrollIntoView from 'compute-scroll-into-view';

import { KeyboardKeys } from '../helpers/keyboardKeys';

/**
 * @deprecated
 * This object is no longer used and will be removed in v2.
 */
export const MenuActions = {
  Close: 'Close',
  CloseSelect: 'CloseSelect',
  First: 'First',
  Last: 'Last',
  Next: 'Next',
  Open: 'Open',
  PageDown: 'PageDown',
  PageUp: 'PageUp',
  Previous: 'Previous',
  Select: 'Select',
  Space: 'Space',
  Type: 'Type',
};

/**
 * @deprecated
 * This object is no longer used and will be removed in v2.
 */
export const TreeActions = {
  Close: 'Close',
  First: 'First',
  Last: 'Last',
  Next: 'Next',
  Open: 'Open',
  Previous: 'Previous',
  Select: 'Select',
  UpLevel: 'UpLevel',
};

/**
 * @deprecated
 * This function is no longer used and will be removed in v2.
 */
// filter an array of options against an input string
// returns an array of options that contains the filter string, case-independent
export function filterOptions(
  options: ReactElement[] = [],
  filter: string | number | null = null,
  exclude: ReactElement[] = [],
) {
  const equalizedTerm = String(filter ?? '').toLowerCase();

  return equalizedTerm
    ? options.filter((option) => {
        // @ts-ignore this will be removed in v2 and isn't used so ignore it.
        const equalizedOptionChildren = option.props.children.toString().toLowerCase();
        const matches = equalizedOptionChildren.includes(equalizedTerm);

        return matches && exclude.indexOf(option) < 0;
      })
    : options;
}

/**
 * @deprecated
 * This function is no longer used and will be removed in v2.
 */
// return combobox action from key press
export function getActionFromKey(key: string, menuOpen: boolean) {
  // handle opening when closed
  if (!menuOpen && key === KeyboardKeys.DOWN) {
    return MenuActions.Open;
  }
  // handle keys when open
  if (key === KeyboardKeys.DOWN) {
    return MenuActions.Next;
  }
  if (key === KeyboardKeys.UP) {
    return MenuActions.Previous;
  }
  if (key === KeyboardKeys.HOME) {
    return MenuActions.First;
  }
  if (key === KeyboardKeys.END) {
    return MenuActions.Last;
  }
  if (key === KeyboardKeys.ESCAPE) {
    return MenuActions.Close;
  }
  if (key === KeyboardKeys.ENTER) {
    return MenuActions.CloseSelect;
  }
  if (key === KeyboardKeys.BACKSPACE || key === KeyboardKeys.CLEAR || key.length === 1) {
    return MenuActions.Type;
  }
}

/**
 * @deprecated
 * This function is no longer used and will be removed in v2.
 */
// get updated option index
export function getUpdatedIndex(current: number, max: number, action: string) {
  switch (action) {
    case MenuActions.First:
      return 0;
    case MenuActions.Last:
      return max;
    case MenuActions.Previous:
      return Math.max(0, current - 1);
    case MenuActions.Next:
      return Math.min(max, current + 1);
    default:
      return current;
  }
}

/**
 * @deprecated
 * This function is no longer used and will be removed in v2.
 */
// ensure given child element is within the parent's visible scroll area
export function maintainScrollVisibility(activeElement: HTMLElement) {
  const actions = computeScrollIntoView(activeElement, {
    scrollMode: 'if-needed',
    block: 'nearest',
    inline: 'nearest',
  });

  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
