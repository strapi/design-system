import React from 'react';
import { VisuallyHidden } from '../VisuallyHidden';
import { LiveRegionIds } from './constants';

export const LiveRegions = () => {
  return (
    <VisuallyHidden>
      <p role="log" aria-live="polite" id={LiveRegionIds.Log}></p>
      <p role="status" aria-live="polite" id={LiveRegionIds.Status}></p>
      <p role="alert" aria-live="assertive" id={LiveRegionIds.Alert}></p>
    </VisuallyHidden>
  );
};
