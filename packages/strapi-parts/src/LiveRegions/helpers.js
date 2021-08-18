import { LiveRegionIds } from './constants';

export const notifyLog = (message) => {
  const logEl = document.querySelector(`#${LiveRegionIds.Log}`);
  logEl.innerText = message;
};

export const notifyStatus = (message) => {
  const statusEl = document.querySelector(`#${LiveRegionIds.Status}`);
  statusEl.innerText = message;
};

export const notifyAlert = (message) => {
  const alertEl = document.querySelector(`#${LiveRegionIds.Alert}`);
  alertEl.innerText = message;
};
