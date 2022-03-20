import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';

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
  flex-wrap: ${({ wrap }) => wrap};
  gap: ${({ gap, theme }) => (gap ? theme.spaces[gap] : undefined)}};
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
  wrap: undefined,
};

Flex.propTypes = {
  alignItems: PropTypes.string,
  basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  gap: PropTypes.number,
  inline: PropTypes.bool,
  justifyContent: PropTypes.string,
  reverse: PropTypes.bool,
  wrap: PropTypes.string,
};
