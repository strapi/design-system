import PropTypes from 'prop-types';
import styled from 'styled-components';

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: ${({ theme }) => theme.spaces[4]};
`;

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
