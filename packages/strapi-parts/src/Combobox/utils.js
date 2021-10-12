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
// returns an array of options that begin with the filter string, case-independent
export function filterOptions(options = [], filter, exclude = []) {
  return filter
    ? options.filter((option) => {
        const optionChildren = option.props.children.toString();
        const matches = optionChildren.toLowerCase().indexOf(filter.toString().toLowerCase()) === 0;
        return matches && exclude.indexOf(option) < 0;
      })
    : options;
}

// return combobox action from key press
export function getActionFromKey(key, menuOpen) {
  // handle opening when closed
  if (!menuOpen && key === KeyboardKeys.DOWN) {
    return MenuActions.Open;
  }
  // handle keys when open
  if (key === KeyboardKeys.DOWN || key === KeyboardKeys.RIGHT) {
    return MenuActions.Next;
  } else if (key === KeyboardKeys.UP || key === KeyboardKeys.LEFT) {
    return MenuActions.Previous;
  } else if (key === KeyboardKeys.HOME) {
    return MenuActions.First;
  } else if (key === KeyboardKeys.END) {
    return MenuActions.Last;
  } else if (key === KeyboardKeys.ESCAPE) {
    return MenuActions.Close;
  } else if (key === KeyboardKeys.ENTER) {
    return MenuActions.CloseSelect;
  } else if (key === KeyboardKeys.BACKSPACE || key === KeyboardKeys.CLEAR || key.length === 1) {
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
