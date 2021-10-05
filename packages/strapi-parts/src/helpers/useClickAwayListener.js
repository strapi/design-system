import { useEffect } from 'react';

export const useClickAwayListener = (ref, onClick) => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  });

  const handleClickAway = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    }

    onClick();
  };
};
