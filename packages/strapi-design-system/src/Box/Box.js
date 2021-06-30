import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useGrid } from '../Grid/GridContext';
import { forwardRef } from 'react';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  color: true,
};

export const BoxWrapper = styled.div.withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  // Colors
  background: ${({ theme, background }) => theme.colors[background]};
  color: ${({ theme, color }) => theme.colors[color]};

  // Spaces
  padding: ${({ theme, padding }) => theme.spaces[padding]};
  padding-top: ${({ theme, paddingTop }) => theme.spaces[paddingTop]};
  padding-right: ${({ theme, paddingRight }) => theme.spaces[paddingRight]};
  padding-bottom: ${({ theme, paddingBottom }) => theme.spaces[paddingBottom]};
  padding-left: ${({ theme, paddingLeft }) => theme.spaces[paddingLeft]};

  // Borders
  border-radius: ${({ theme, hasRadius }) => (hasRadius ? theme.borderRadius : undefined)};
  border: ${({ theme, borderColor }) => (borderColor ? `1px solid ${theme.colors[borderColor]}` : undefined)};

  // Shadows
  box-shadow: ${({ theme, shadow }) => theme.shadows[shadow]};

  // Custom grid
  flex: ${({ col }) => col};
  flex-basis: ${({ col, theme, gap, gridCols }) =>
    col ? `calc(${(col / gridCols) * 100}% - ${theme.spaces[gap]})` : undefined};
`;

export const Box = forwardRef((props, ref) => {
  const { gap, gridCols } = useGrid();

  return <BoxWrapper ref={ref} gap={gap} gridCols={gridCols} {...props} />;
});

Box.displayName = 'Box';

Box.defaultProps = {
  background: undefined,
  borderColor: undefined,
  color: undefined,
  padding: undefined,
  paddingTop: undefined,
  paddingRight: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
  hasRadius: false,
  shadow: undefined,
};

Box.propTypes = {
  background: PropTypes.string,
  borderColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  hasRadius: PropTypes.bool,
  padding: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  shadow: PropTypes.string,
};
