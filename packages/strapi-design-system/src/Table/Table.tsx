import React, { useRef, useState, useEffect } from 'react';

import styled from 'styled-components';

import { Box } from '../Box';
import { RawTable, RawTableProps } from '../RawTable/RawTable';

const TableContainer = styled(Box)`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

const TableWrapper = styled(RawTable)`
  width: 100%;
  white-space: nowrap;
`;

export type Overflowing = 'both' | 'left' | 'right';

const TableBox = styled(Box)<{ overflowing?: Overflowing }>`
  &:before {
    // TODO: make sure to add a token for this weird stuff
    background: linear-gradient(90deg, #c0c0cf 0%, rgba(0, 0, 0, 0) 100%);
    opacity: 0.2;
    position: absolute;
    height: 100%;
    content: ${({ overflowing }) => (overflowing === 'both' || overflowing === 'left' ? "''" : undefined)};
    box-shadow: ${({ theme }) => theme.shadows.tableShadow};
    width: ${({ theme }) => theme.spaces[2]};
    left: 0;
  }

  &:after {
    // TODO: make sure to add a token for this weird stuff
    background: linear-gradient(270deg, #c0c0cf 0%, rgba(0, 0, 0, 0) 100%);
    opacity: 0.2;
    position: absolute;
    height: 100%;
    content: ${({ overflowing }) => (overflowing === 'both' || overflowing === 'right' ? "''" : undefined)};
    box-shadow: ${({ theme }) => theme.shadows.tableShadow};
    width: ${({ theme }) => theme.spaces[2]};
    right: 0;
    top: 0;
  }
`;

const ScrollContainer = styled(Box)`
  overflow-x: auto;
`;

export interface TableProps extends RawTableProps {
  footer?: React.ReactNode;
}

export const Table = ({ footer, ...props }: TableProps) => {
  const tableRef = useRef<HTMLDivElement>(null!);
  const [overflowing, setOverflowing] = useState<Overflowing>();

  const handleScroll = (e) => {
    const maxScrollLeft = e.target.scrollWidth - e.target.clientWidth;

    if (e.target.scrollLeft === 0) {
      setOverflowing('right');

      return;
    }

    if (e.target.scrollLeft === maxScrollLeft) {
      setOverflowing('left');

      return;
    }

    if (e.target.scrollLeft > 0) {
      setOverflowing('both');
    }
  };

  useEffect(() => {
    if (tableRef.current.scrollWidth > tableRef.current.clientWidth) {
      setOverflowing('right');
    }
  }, []);

  return (
    <TableContainer shadow="tableShadow" hasRadius background="neutral0">
      <TableBox overflowing={overflowing} position="relative">
        <ScrollContainer ref={tableRef} onScroll={handleScroll} paddingLeft={6} paddingRight={6}>
          <TableWrapper {...props} />
        </ScrollContainer>
      </TableBox>
      {footer}
    </TableContainer>
  );
};
