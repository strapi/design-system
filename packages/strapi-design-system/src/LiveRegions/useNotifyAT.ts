import { useEffect } from 'react';

import { LiveRegionIds } from './constants';

const notifyLog = (message: string) => {
  const logEl = document.querySelector(`#${LiveRegionIds.Log}`) as HTMLElement;

  if (logEl) {
    logEl.innerText = message;
  }
};

const notifyStatus = (message: string) => {
  const statusEl = document.querySelector(`#${LiveRegionIds.Status}`) as HTMLElement;

  if (statusEl) {
    statusEl.innerText = message;
  }
};

const notifyAlert = (message: string) => {
  const alertEl = document.querySelector(`#${LiveRegionIds.Alert}`) as HTMLElement;

  if (alertEl) {
    alertEl.innerText = message;
  }
};

export const useNotifyAT = () => {
  useEffect(() => {
    return () => {
      notifyLog('');
      notifyAlert('');
      notifyStatus('');
    };
  }, []);

  return { notifyLog, notifyAlert, notifyStatus };
};
