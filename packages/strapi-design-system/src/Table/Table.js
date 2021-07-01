import React from 'react';
import PropTypes from 'prop-types';
import { RawTable } from '../RawTable/RawTable';
import styled from 'styled-components';
import { Box } from '../Box';

const TableWrapper = styled(RawTable)`
  width: 100%;
`;

const TableBox = styled(Box)`
  border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
`;

export const Table = ({ colCount, rowCount, ...props }) => {
  return (
    <TableBox background="neutral0" paddingLeft={3} paddingRight={3}>
      <TableWrapper colCount={colCount} rowCount={rowCount} {...props} />
    </TableBox>
  );
};

Table.propTypes = {
  colCount: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};
