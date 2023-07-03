import React from 'react';

import styled from 'styled-components';

import { Box } from '../Box';
import { Flex, FlexProps } from '../Flex';

export interface NavSectionsProps extends FlexProps {
  horizontal?: boolean;

  /**
   * @preserve
   * @deprecated Use gap instead;
   */
  spacing?: FlexProps['gap'];
}

const BoxGrow = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
`;

export const NavSections = ({ children, spacing = 4, horizontal = false, ...props }: NavSectionsProps) => {
  return (
    <BoxGrow paddingLeft={3} paddingRight={2} paddingTop={3} paddingBottom={8}>
      <Flex
        as="ul"
        gap={spacing}
        direction={horizontal ? 'row' : 'column'}
        alignItems={horizontal ? 'center' : 'stretch'}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{child}</li>;
        })}
      </Flex>
    </BoxGrow>
  );
};
