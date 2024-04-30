import * as React from 'react';

const useLockScroll = (lockScroll: boolean) => {
  React.useEffect(() => {
    if (lockScroll) {
      document.body.classList.add('lock-body-scroll');
    }

    return () => {
      document.body.classList.remove('lock-body-scroll');
    };
  }, [lockScroll]);
};

export { useLockScroll };
