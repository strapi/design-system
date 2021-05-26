import { useEffect, useRef } from 'react';

export const useTabsFocus = (selectedTabIndex) => {
  const tabsRef = useRef(null);
  const mountedRef = useRef(null);

  useEffect(() => {
    if (!tabsRef.current) return;

    // We don't' want to send the focus to the tab when it mounts
    // It could break the navigating flow of the users if the focus was supposed to be
    // on another element
    if (mountedRef.current) {
      const nextFocusEl = tabsRef.current.querySelector('[tabindex="0"]');

      if (nextFocusEl) {
        nextFocusEl.focus();
      }
    }

    if (!mountedRef.current) {
      mountedRef.current = true;
    }
  }, [selectedTabIndex]);

  return tabsRef;
};
