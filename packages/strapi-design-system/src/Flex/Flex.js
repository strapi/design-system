import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Box } from '../Box';

import handleResponsiveValues from '../helpers/handleResponsiveValues';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps = {
  direction: true,
};

export const Flex = styled(Box).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  align-items: ${({ alignItems }) => alignItems};
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ direction }) => direction};
  flex-shrink: ${({ shrink }) => shrink};
  flex-wrap: ${({ wrap }) => wrap};
  ${({ gap, theme }) => handleResponsiveValues('gap', gap, theme)};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

Flex.defaultProps = {
  alignItems: 'center',
  basis: undefined,
  direction: 'row',
  gap: undefined,
  inline: false,
  justifyContent: undefined,
  reverse: false,
  shrink: undefined,
  wrap: undefined,
};

Flex.propTypes = {
  alignItems: PropTypes.string,
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  /**
   * Supports responsive values
   */
  gap: PropTypes.oneOfType([
    PropTypes.shape({
      desktop: PropTypes.number,
      mobile: PropTypes.number,
      tablet: PropTypes.number,
    }),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
  ]),
  inline: PropTypes.bool,
  justifyContent: PropTypes.string,
  reverse: PropTypes.bool,
  shrink: PropTypes.number,
  wrap: PropTypes.string,
};
