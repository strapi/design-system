import * as React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';
import handleResponsiveValues from '../helpers/handleResponsiveValues';
import { GridContext } from './GridContext';

const GridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${({ gridCols }) => gridCols}, 1fr);
  ${({ theme, gap }) => handleResponsiveValues('gap', gap, theme)}
`;

export const Grid = ({ gap, gridCols, ...props }) => {
  const context = React.useMemo(() => ({ gap, gridCols }), [gap, gridCols]);

  return (
    <GridContext.Provider value={context}>
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
