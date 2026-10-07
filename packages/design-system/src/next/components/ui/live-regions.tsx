import * as React from 'react';

import { VisuallyHidden, type VisuallyHiddenProps } from './visually-hidden';

/**
 * The ids are the same as in the legacy system, so `useNotifyAT` from either system writes to the
 * regions that are on the page
 */
const LiveRegionIds = {
  Log: 'live-region-log',
  Status: 'live-region-status',
  Alert: 'live-region-alert',
} as const;

/**
 * Three visually hidden live regions (log, status, alert) that `useNotifyAT` writes to. Render it once,
 * near the root of the app. The legacy `DesignSystemProvider` already renders them: an app that keeps
 * that provider must not render this one too.
 */
const LiveRegions = React.forwardRef<HTMLSpanElement, Omit<VisuallyHiddenProps, 'children'>>((props, ref) => {
  return (
    <VisuallyHidden ref={ref} data-slot="live-regions" {...props}>
      <p role="log" aria-live="polite" id={LiveRegionIds.Log} aria-relevant="all" />
      <p role="status" aria-live="polite" id={LiveRegionIds.Status} aria-relevant="all" />
      <p role="alert" aria-live="assertive" id={LiveRegionIds.Alert} aria-relevant="all" />
    </VisuallyHidden>
  );
});

LiveRegions.displayName = 'LiveRegions';

const writeRegion = (id: string, message: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = message;
  }
};

const notifyLog = (message: string) => writeRegion(LiveRegionIds.Log, message);
const notifyStatus = (message: string) => writeRegion(LiveRegionIds.Status, message);
const notifyAlert = (message: string) => writeRegion(LiveRegionIds.Alert, message);

/**
 * Announces a message to assistive technology through the live regions of `LiveRegions`.
 *
 * - `notifyLog`: a polite message in the `log` region
 * - `notifyStatus`: a polite message in the `status` region
 * - `notifyAlert`: an assertive message in the `alert` region
 *
 * The regions are emptied when the component that calls the hook unmounts.
 */
const useNotifyAT = () => {
  React.useEffect(() => {
    return () => {
      notifyLog('');
      notifyAlert('');
      notifyStatus('');
    };
  }, []);

  return { notifyLog, notifyAlert, notifyStatus };
};

export { LiveRegions, LiveRegionIds, useNotifyAT };
