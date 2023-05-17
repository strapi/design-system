import React, { Children } from 'react';

import { Box } from '../../Box';
import { Flex, FlexProps } from '../../Flex';

export interface SubNavSectionsProps extends FlexProps<'ol'> {
  children: React.ReactNode;
  spacing?: number;
  horizontal?: boolean;
}

export const SubNavSections = ({ children, spacing = 2, horizontal = false, ...props }: SubNavSectionsProps) => {
  return (
    <Box paddingTop={2} paddingBottom={4}>
      <Flex
        as="ol"
        gap={spacing}
        direction={horizontal ? 'row' : 'column'}
        alignItems={horizontal ? 'center' : 'stretch'}
        {...props}
      >
        {Children.map(children, (child, index) => {
          /* eslint-disable react/no-array-index-key */
          return <li key={index}>{child}</li>;
        })}
      </Flex>
    </Box>
  );
};
