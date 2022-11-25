import { useEffect, useRef } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

export const useTabsFocus = (selectedTabIndex, onTabChange) => {
  const tabsRef = useRef(null);
  const mountedRef = useRef(null);

  const handleTabChange = useCallbackRef(onTabChange);

  useEffect(() => {
    if (!tabsRef.current) return;

    // We don't' want to send the focus to the tab when it mounts
    // It could break the navigating flow of the users if the focus was supposed to be
    // on another element
    if (mountedRef.current) {
      const nextFocusEl = tabsRef.current.querySelector('[tabindex="0"]');

      if (nextFocusEl) {
        nextFocusEl.focus();
        handleTabChange(selectedTabIndex);
      }
    }

    if (!mountedRef.current) {
      mountedRef.current = true;
    }
  }, [selectedTabIndex, handleTabChange]);

  return tabsRef;
};
