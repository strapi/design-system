import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RawTable } from '../RawTable/RawTable';
import styled from 'styled-components';
import { Box } from '../Box';

const TableWrapper = styled(RawTable)`
  width: 100%;
  white-space: nowrap;
`;

const TableBox = styled(Box)`
  position: relative;

  &:before {
    position: absolute;
    height: 100%;
    content: ${({ overflowing }) => (overflowing === 'both' || overflowing === 'left' ? "''" : undefined)};
    width: 10px;
    background: red;
    left: 0;
  }

  &:after {
    position: absolute;
    height: 100%;
    content: ${({ overflowing }) => (overflowing === 'both' || overflowing === 'right' ? "''" : undefined)};
    width: 10px;
    background: red;
    right: 0;
    top: 0;
  }
`;

const ScrollContainer = styled.div`
  overflow-x: scroll;
  position: relative;
`;

export const Table = ({ colCount, rowCount, ...props }) => {
  const tableRef = useRef(null);
  const [overflowing, setOverflowing] = useState();

  const handleScroll = (e) => {
    const maxScrollLeft = e.target.scrollWidth - e.target.clientWidth;

    if (e.target.scrollLeft === 0) {
      return setOverflowing('right');
    }

    if (e.target.scrollLeft === maxScrollLeft) {
      return setOverflowing('left');
    }

    if (e.target.scrollLeft > 0) {
      return setOverflowing('both');
    }
  };

  useEffect(() => {
    if (tableRef.current.scrollWidth > tableRef.current.clientWidth) {
      setOverflowing('right');
    }
  }, []);

  return (
    <TableBox background="neutral0" paddingLeft={3} paddingRight={3} hasRadius overflowing={overflowing}>
      <ScrollContainer ref={tableRef} onScroll={handleScroll}>
        <TableWrapper colCount={colCount} rowCount={rowCount} {...props} />
      </ScrollContainer>
    </TableBox>
  );
};

Table.propTypes = {
  colCount: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};
