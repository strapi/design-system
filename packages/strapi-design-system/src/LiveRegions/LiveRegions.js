import React from 'react';
import { VisuallyHidden } from '../VisuallyHidden';
import { LiveRegionIds } from './constants';

export const LiveRegions = () => {
  return (
    <VisuallyHidden>
      <p role="log" aria-live="polite" id={LiveRegionIds.Log} aria-relevant="all"></p>
      <p role="status" aria-live="polite" id={LiveRegionIds.Status} aria-relevant="all"></p>
      <p role="alert" aria-live="assertive" id={LiveRegionIds.Alert} aria-relevant="all"></p>
    </VisuallyHidden>
  );
};
