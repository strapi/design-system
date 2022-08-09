import styled from 'styled-components';
import { Box } from '../Box';
import handleResponsiveValues from '../helpers/handleResponsiveValues';
import { flexDefaultProps, flexPropTypes } from './FlexProps';

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
  ${({ gap, theme }) => handleResponsiveValues('gap', gap, theme)}};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

Flex.defaultProps = flexDefaultProps;
Flex.propTypes = flexPropTypes;
