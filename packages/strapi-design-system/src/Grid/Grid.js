import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';

const handleGap = ({ theme, gap }) => {
  if (Array.isArray(gap)) {
    const sizes = gap.map((size) => theme.spaces[size]).join(' ');

    return sizes;
  }

  return theme.spaces[gap];
};

const handleAreas = ({ areas }) => {
  if (!areas) {
    return null;
  }

  const stringAreas = areas.map((row) => `"${row}"`).join('\n');

  return stringAreas;
};

export const Grid = styled(Box)`
  display: grid;
  grid-template-columns: ${({ cols }) => cols};
  grid-template-rows: ${({ rows }) => rows};
  gap: ${handleGap};
  grid-template-areas: ${handleAreas};
`;

Grid.displayName = 'Grid';

Grid.propTypes = {
  cols: PropTypes.string,
  rows: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  areas: PropTypes.arrayOf(PropTypes.string),
};
