import * as React from 'react';

import { Box } from '../Box';
import { Flex } from '../Flex';

import { PaginationContext } from './PaginationContext';

export interface PaginationProps {
  activePage: number;
  children: React.ReactNode;
  label?: string;
  pageCount: number;
}

export const Pagination = ({ children, label = 'Pagination', activePage, pageCount }: PaginationProps) => {
  const context = React.useMemo(() => ({ activePage, pageCount }), [activePage, pageCount]);

  return (
    <PaginationContext.Provider value={context}>
      <Box aria-label={label} tag="nav">
        <Flex tag="ol" gap={1}>
          {React.Children.map(children, (child, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index}>{child}</li>;
          })}
        </Flex>
      </Box>
    </PaginationContext.Provider>
  );
};
