import computeScrollIntoView from 'compute-scroll-into-view';
import { KeyboardKeys } from '../helpers/keyboardKeys';

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

// filter an array of options against an input string
// returns an array of options that contains the filter string, case-independent
export function filterOptions(options = [], filter = null, exclude = []) {
  const equalizedTerm = String(filter ?? '').toLowerCase();

  return equalizedTerm
    ? options.filter((option) => {
        const equalizedOptionChildren = option.props.children.toString().toLowerCase();
        const matches = equalizedOptionChildren.includes(equalizedTerm);

        return matches && exclude.indexOf(option) < 0;
      })
    : options;
}

// return combobox action from key press
// eslint-disable-next-line consistent-return
export function getActionFromKey(key, menuOpen) {
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

// get updated option index
export function getUpdatedIndex(current, max, action) {
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

// ensure given child element is within the parent's visible scroll area
export function maintainScrollVisibility(activeElement) {
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
