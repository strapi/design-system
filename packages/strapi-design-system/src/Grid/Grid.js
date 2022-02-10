import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GridContext } from './GridContext';
import { Box } from '../Box';
import handleResponsiveValues from '../helpers/handleResponsiveValues';

const GridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${({ gridCols }) => gridCols}, 1fr);
  ${({ theme, gap }) => handleResponsiveValues('gap', gap, theme)}
`;

export const Grid = ({ gap, gridCols, ...props }) => {
  return (
    <GridContext.Provider value={{ gap, gridCols }}>
      <GridWrapper gap={gap} gridCols={gridCols} {...props} />
    </GridContext.Provider>
  );
};

Grid.defaultProps = {
  gap: 0,
  gridCols: 12,
};

Grid.propTypes = {
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  gridCols: PropTypes.number,
};
