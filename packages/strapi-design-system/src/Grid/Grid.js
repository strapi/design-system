import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GridContext } from './GridContext';
import { Box } from '../Box';

const GridWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin-right: ${({ gap, theme }) => theme.spaces[gap]};
    margin-top: ${({ gap, theme }) => theme.spaces[gap]};
  }

  margin-right: -${({ gap, theme }) => theme.spaces[gap]};
  margin-top: -${({ gap, theme }) => theme.spaces[gap]};
`;

const GridContainer = styled.div`
  overflow: hidden;
`;

export const Grid = ({ gap, gridCols, ...props }) => {
  return (
    <GridContext.Provider value={{ gap, gridCols }}>
      <GridContainer>
        <GridWrapper gap={gap} {...props} />
      </GridContainer>
    </GridContext.Provider>
  );
};

Grid.defaultProps = {
  gap: 0,
  gridCols: 12,
};

Grid.propTypes = {
  gap: PropTypes.number,
  gridCols: PropTypes.number,
};
