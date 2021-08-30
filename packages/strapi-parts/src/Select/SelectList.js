import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { Stack } from '../Stack';
import { changeDescendant, getActiveDescendant } from './utils';
import { useListRef } from './hooks/useListRef';
import { DownState, UpState } from './constants';

export const SelectList = ({ labelledBy, onSelectItem, children, multi, onEscape, expanded }) => {
  const listRef = useListRef(expanded, onSelectItem, multi);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ESCAPE: {
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

          if (!multi) {
            onSelectItem(nextOption.getAttribute('data-strapi-value'));
          }
        } else {
          const options = listRef.current.querySelectorAll('[role="option"]');
          const firstOption = options[0];

          changeDescendant(listRef.current, firstOption);

          if (!multi) {
            onSelectItem(firstOption.getAttribute('data-strapi-value'));
          }
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

          if (!multi) {
            onSelectItem(previousOption.getAttribute('data-strapi-value'));
          }
        } else {
          const options = listRef.current.querySelectorAll('[role="option"]');
          const lastOption = options[options.length - 1];

          changeDescendant(listRef.current, lastOption);

          if (!multi) {
            onSelectItem(lastOption.getAttribute('data-strapi-value'));
          }
        }
        break;
      }

      case KeyboardKeys.SPACE:
      case KeyboardKeys.ENTER: {
        e.preventDefault();

        if (multi) {
          const currentOption = getActiveDescendant(listRef.current);

          if (currentOption.getAttribute('data-opt-group')) {
            onSelectItem(
              currentOption.getAttribute('data-opt-group-children').split(','),
              currentOption.getAttribute('data-opt-group'),
            );
          } else {
            onSelectItem(currentOption.getAttribute('data-strapi-value'));
          }
        } else {
          onEscape();
        }

        break;
      }

      default:
        break;
    }
  };

  return (
    <Stack
      as="ul"
      size={1}
      role="listbox"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      ref={listRef}
      onKeyDown={handleKeyDown}
      onBlur={onEscape}
      aria-multiselectable={multi}
      // aria-activedescendant, this props is dynamically added in the useListRef
    >
      {children}
    </Stack>
  );
};

SelectList.defaultProps = {
  multi: false,
};

SelectList.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.oneOf([UpState.Keyboard, UpState.Mouse, DownState.Keyboard, DownState.Mouse]).isRequired,
  labelledBy: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onEscape: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};
