import React, { Children } from 'react';

import styled from 'styled-components';

import { Divider } from './Divider';
import { Box } from '../../Box';
import { Flex, FlexProps } from '../../Flex';

const AlignedList = styled(Flex)`
  // CrumbLinks do have padding-x, because they need to have a
  // interaction effect, which mis-aligns the breadcrumbs on the left.
  // This normalizes the behavior by moving the first item to left by
  // the same amount it has inner padding
  :first-child {
    margin-left: ${({ theme }) => `calc(-1*${theme.spaces[2]})`};
  }
`;

export interface BreadcrumbsProps extends FlexProps {
  label?: string;
}

export const Breadcrumbs = ({ label, children, ...props }: BreadcrumbsProps) => {
  const childrenArray = Children.toArray(children);

  return (
    <Box aria-label={label} {...props}>
      <AlignedList as="ol">
        {Children.map(childrenArray, (child, index) => {
          const shouldDisplayDivider = childrenArray.length > 1 && index + 1 < childrenArray.length;

          return (
            <Flex inline as="li">
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
