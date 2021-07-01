import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useGrid } from './GridContext';

const GridItemWrapper = styled.div`
  grid-column: span ${({ col }) => col};
`;

export const GridItem = ({ col, ...props }) => {
  const { gap, gridCols } = useGrid();

  return (
    <GridItemWrapper gap={gap} gridCols={gridCols} col={col}>
      <Box {...props} />
    </GridItemWrapper>
  );
};

GridItem.propTypes = {
  col: PropTypes.number.isRequired,
};
