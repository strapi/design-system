import { useRef, useEffect } from 'react';
import { DownState, UpState } from '../constants';
import { changeDescendant } from '../utils';

export const useListRef = (expanded) => {
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.focus();
  }, []);

  useEffect(() => {
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
