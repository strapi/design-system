import { useEffect } from 'react';

import { LiveRegionIds } from './constants';

const notifyLog = (message) => {
  const logEl = document.querySelector(`#${LiveRegionIds.Log}`);

  if (logEl) {
    logEl.innerText = message;
  }
};

const notifyStatus = (message) => {
  const statusEl = document.querySelector(`#${LiveRegionIds.Status}`);

  if (statusEl) {
    statusEl.innerText = message;
  }
};

const notifyAlert = (message) => {
  const alertEl = document.querySelector(`#${LiveRegionIds.Alert}`);

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
