import { useEffect, useRef } from 'react';
import { changeDescendant } from '../utils';

export const useListRef = (expanded, onSelectItem) => {
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.focus();
  }, []);

  useEffect(() => {
    const lastSelected = listRef.current.querySelector('[aria-selected="true"]');
    const options = listRef.current.querySelectorAll('[role="option"]');

    let nextOption;

    if (lastSelected) {
      nextOption = lastSelected;
    } else if (expanded === 'up') {
      nextOption = options[options.length - 1];
    } else if (expanded === 'down') {
      nextOption = options[0];
    }

    if (nextOption) {
      changeDescendant(listRef.current, nextOption);
      onSelectItem(nextOption.getAttribute('data-strapi-value'));
    }
  }, [expanded]);

  return listRef;
};
