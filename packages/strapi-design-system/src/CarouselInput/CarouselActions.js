import React from 'react';
import { Stack } from '../Stack';

export const CarouselActions = (props) => (
  <Stack justifyContent="center" horizontal spacing={1} position="absolute" width="100%" bottom={1} {...props} />
);
