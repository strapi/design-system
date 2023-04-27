import * as React from 'react';

import { compute } from 'compute-scroll-into-view';

import { Flex } from '../Flex';
import { KeyboardKeys } from '../helpers/keyboardKeys';

const DownState = {
  Keyboard: 'down:keyboard',
  Mouse: 'down:mouse',
} as const;

const UpState = { Keyboard: 'up:keyboard', Mouse: 'up:mouse' } as const;

type AllStates = (typeof DownState)[keyof typeof DownState] | (typeof UpState)[keyof typeof UpState];

export interface SelectListProps {
  labelledBy?: string;
  multi?: boolean;
  expanded: AllStates;
  onEscape: () => void;
  onSelectItem: (value: string | string[], group?: string) => void;
  children: React.ReactNode;
}

/**
 * @preserve
 * @deprecated This component will be removed in the next major release.
 * If you need a custom listbox I would recommend opening a new issue.
 */
export const SelectList = ({
  labelledBy,
  onSelectItem,
  children,
  multi = false,
  onEscape,
  expanded,
}: SelectListProps) => {
  const listRef = useListRef(expanded);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ESCAPE: {
        e.stopPropagation();
        onEscape();
        break;
      }

      case KeyboardKeys.DOWN: {
        e.preventDefault();
        const currentOption = getActiveDescendant(listRef.current);

        if (!currentOption) return;

        const nextOption = currentOption.nextSibling;

        if (nextOption) {
          changeDescendant(listRef.current, nextOption);
        } else {
          const options = listRef.current.querySelectorAll('[role="option"]');
          const firstOption = options[0];

          changeDescendant(listRef.current, firstOption);
        }
        break;
      }

      case KeyboardKeys.UP: {
        e.preventDefault();
        const currentOption = getActiveDescendant(listRef.current);

        if (!currentOption) return;

        const previousOption = currentOption.previousSibling;

        if (previousOption) {
          changeDescendant(listRef.current, previousOption);
        } else {
          const options = listRef.current.querySelectorAll('[role="option"]');
          const lastOption = options[options.length - 1];

          changeDescendant(listRef.current, lastOption);
        }
        break;
      }

      case KeyboardKeys.SPACE:
      case KeyboardKeys.ENTER: {
        e.preventDefault();

        const currentOption = getActiveDescendant(listRef.current);

        if (currentOption.getAttribute('data-opt-group')) {
          onSelectItem(
            currentOption.getAttribute('data-opt-group-children')!.split(','),
            currentOption.getAttribute('data-opt-group')!,
          );
        } else {
          onSelectItem(currentOption.getAttribute('data-strapi-value')!);
        }

        if (!multi) {
          onEscape();
        }

        break;
      }

      default:
        break;
    }
  };

  return (
    <Flex
      as="ul"
      gap={1}
      direction="column"
      alignItems="stretch"
      role="listbox"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      ref={listRef}
      onKeyDown={handleKeyDown}
      onBlur={onEscape}
    >
      {children}
    </Flex>
  );
};

const changeDescendant = (list, option) => {
  list.setAttribute('aria-activedescendant', option.getAttribute('id'));

  const options = list.querySelectorAll('[role="option"]');

  options.forEach((opt) => opt.classList.remove('is-focused'));
  option.classList.add('is-focused');

  const actions = compute(option, {
    scrollMode: 'if-needed',
    block: 'nearest',
    inline: 'nearest',
  });

  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
};

const useListRef = (expanded: AllStates) => {
  const listRef = React.useRef<HTMLUListElement>(null!);

  React.useEffect(() => {
    listRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (!listRef.current) return;

    const lastSelected = listRef.current.querySelector('[aria-selected="true"]');
    const options = listRef.current.querySelectorAll('[role="option"]');

    let nextOption;

    if (lastSelected) {
      nextOption = lastSelected;
    } else if (expanded === UpState.Keyboard) {
      nextOption = options[options.length - 1];
    } else if (expanded === DownState.Keyboard) {
      nextOption = options[0];
    }

    if (nextOption) {
      if (expanded === UpState.Keyboard || expanded === DownState.Keyboard) {
        changeDescendant(listRef.current, nextOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return listRef;
};

const getActiveDescendant = (list: HTMLUListElement) => {
  const id = list.getAttribute('aria-activedescendant');

  return list.querySelector(`#${id}`)!;
};
