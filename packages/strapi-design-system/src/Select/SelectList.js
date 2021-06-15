import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { useListRef } from './hooks/useListRef';
import { changeDescendant, getActiveDescendant } from './utils';

export const SelectList = ({ labelledBy, onSelectItem, children, onEscape, expanded }) => {
  const listRef = useListRef(expanded, onSelectItem);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ESCAPE: {
        onEscape();
        break;
      }

      case KeyboardKeys.DOWN: {
        const currentOption = getActiveDescendant(listRef.current);
        const nextOption = currentOption.nextSibling;

        if (nextOption) {
          changeDescendant(listRef.current, nextOption);
          return onSelectItem(nextOption.getAttribute('data-strapi-value'));
        }

        const options = listRef.current.querySelectorAll('[role="option"]');
        const firstOption = options[0];
        changeDescendant(listRef.current, firstOption);
        return onSelectItem(firstOption.getAttribute('data-strapi-value'));
      }

      case KeyboardKeys.UP: {
        const currentOption = getActiveDescendant(listRef.current);
        const previousOption = currentOption.previousSibling;

        if (previousOption) {
          changeDescendant(listRef.current, previousOption);
          return onSelectItem(previousOption.getAttribute('data-strapi-value'));
        }

        const options = listRef.current.querySelectorAll('[role="option"]');
        const lastOption = options[options.length - 1];
        changeDescendant(listRef.current, lastOption);
        return onSelectItem(lastOption.getAttribute('data-strapi-value'));
      }

      case KeyboardKeys.SPACE:
      case KeyboardKeys.ENTER: {
        e.preventDefault();
        onEscape();

        break;
      }

      default:
        break;
    }
  };

  return (
    <ul
      role="listbox"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      ref={listRef}
      onKeyDown={handleKeyDown}
      onBlur={onEscape}
      // aria-activedescendant, this props is dynamically added in the useListRef
    >
      {children}
    </ul>
  );
};

SelectList.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.oneOf(['up', 'down']).isRequired,
  labelledBy: PropTypes.string.isRequired,
  onEscape: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};
