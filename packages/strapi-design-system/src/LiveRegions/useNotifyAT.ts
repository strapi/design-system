import { useEffect } from 'react';

import { LiveRegionIds } from './constants';

const notifyLog = (message: string) => {
  const logEl = document.querySelector<HTMLElement>(`#${LiveRegionIds.Log}`);

  if (logEl) {
    logEl.innerText = message;
  }
};

const notifyStatus = (message: string) => {
  const statusEl = document.querySelector<HTMLElement>(`#${LiveRegionIds.Status}`);

  if (statusEl) {
    statusEl.innerText = message;
  }
};

const notifyAlert = (message: string) => {
  const alertEl = document.querySelector<HTMLElement>(`#${LiveRegionIds.Alert}`);

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
