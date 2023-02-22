import React from 'react';

import { LiveRegionIds } from './constants';
import { VisuallyHidden } from '../VisuallyHidden';

export const LiveRegions = () => {
  return (
    <VisuallyHidden>
      <p role="log" aria-live="polite" id={LiveRegionIds.Log} aria-relevant="all" />
      <p role="status" aria-live="polite" id={LiveRegionIds.Status} aria-relevant="all" />
      <p role="alert" aria-live="assertive" id={LiveRegionIds.Alert} aria-relevant="all" />
    </VisuallyHidden>
  );
};
