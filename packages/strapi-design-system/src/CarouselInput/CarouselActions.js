import React from 'react';

import { Flex } from '../Flex';

export const CarouselActions = ({ horizontal = true, spacing = 1, ...props }) => (
  <Flex
    justifyContent="center"
    gap={spacing}
    direction={horizontal ? 'row' : 'column'}
    alignItems={horizontal ? 'center' : 'stretch'}
    position="absolute"
    width="100%"
    bottom={1}
    {...props}
  />
);
