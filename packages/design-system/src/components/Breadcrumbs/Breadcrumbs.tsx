import * as React from 'react';

import { styled } from 'styled-components';

import { Box } from '../../primitives/Box';
import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';

import { Divider } from './Divider';

const AlignedList = styled<FlexComponent<'ol'>>(Flex)`
  // CrumbLinks do have padding-x, because they need to have a
  // interaction effect, which mis-aligns the breadcrumbs on the left.
  // This normalizes the behavior by moving the first item to left by
  // the same amount it has inner padding
  & > *:first-child {
    margin-left: ${({ theme }) => `calc(-1*${theme.spaces[2]})`};
  }
`;

export interface BreadcrumbsProps extends FlexProps {
  label?: string;
}

export const Breadcrumbs = ({ label, children, ...props }: BreadcrumbsProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Box aria-label={label} tag="nav" {...props}>
      <AlignedList tag="ol">
        {React.Children.map(childrenArray, (child, index) => {
          const shouldDisplayDivider = childrenArray.length > 1 && index + 1 < childrenArray.length;

          return (
            <Flex inline tag="li">
              {child}
              {shouldDisplayDivider && <Divider />}
            </Flex>
          );
        })}
      </AlignedList>
    </Box>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
