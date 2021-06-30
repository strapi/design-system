import React from 'react';
import PropTypes from 'prop-types';
import { RawTable } from '../RawTable/RawTable';
import styled from 'styled-components';

const TableWrapper = styled(RawTable)`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
`;

export const Table = ({ colCount, rowCount, ...props }) => {
  return <TableWrapper colCount={colCount} rowCount={rowCount} {...props} />;
};

Table.propTypes = {
  colCount: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};
