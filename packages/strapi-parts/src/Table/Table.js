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
  border-radius: ${({ theme, footer }) =>
    footer ? `${theme.borderRadius} ${theme.borderRadius} 0 0` : theme.borderRadius};

  &:before {
    // TODO: make sure to add a token for this weird stuff
    background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    opacity: 0.2;
    position: absolute;
    height: 100%;
    content: ${({ overflowing }) => (overflowing === 'both' || overflowing === 'left' ? "''" : undefined)};
    box-shadow: ${({ theme }) => theme.shadows.tableShadow};
    width: 8px;
    left: 0;
  }

  &:after {
    // TODO: make sure to add a token for this weird stuff
    background: linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
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

export const Table = ({ colCount, rowCount, footer, ...props }) => {
  const tableRef = useRef(null);
  const [overflowing, setOverflowing] = useState();
  console.log(footer);

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
    <Box shadow="tableShadow" hasRadius>
      <TableBox footer={footer} background="neutral0" overflowing={overflowing}>
        <ScrollContainer ref={tableRef} onScroll={handleScroll} paddingLeft={6} paddingRight={6}>
          <TableWrapper colCount={colCount} rowCount={rowCount} {...props} />
        </ScrollContainer>
      </TableBox>
      {footer}
    </Box>
  );
};

Table.defaultProps = {
  footer: undefined,
};

Table.propTypes = {
  colCount: PropTypes.number.isRequired,
  footer: PropTypes.node,
  rowCount: PropTypes.number.isRequired,
};
