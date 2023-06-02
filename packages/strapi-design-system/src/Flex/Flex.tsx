import styled, { CSSProperties } from 'styled-components';

import { Box, BoxProps } from '../Box';
import handleResponsiveValues, { ResponsiveValue } from '../helpers/handleResponsiveValues';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps: Partial<Record<keyof FlexProps, boolean>> = {
  direction: true,
};

export type FlexProps<TElement extends keyof JSX.IntrinsicElements = 'div'> = BoxProps<TElement> & {
  alignItems?: CSSProperties['alignItems'];
  direction?: CSSProperties['flexDirection'];
  /**
   * Supports responsive values
   */
  gap?: ResponsiveValue;
  inline?: boolean;
  justifyContent?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
};

export const Flex = styled(Box).withConfig<FlexProps>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop as keyof FlexProps] && defPropValFN(prop),
})`
  align-items: ${({ alignItems = 'center' }) => alignItems};
  display: ${({ display = 'flex', inline }) => (inline ? 'inline-flex' : display)};
  flex-direction: ${({ direction = 'row' }) => direction};
  flex-shrink: ${({ shrink }) => shrink};
  flex-wrap: ${({ wrap }) => wrap};
  ${({ gap, theme }) => handleResponsiveValues('gap', gap, theme)};
  justify-content: ${({ justifyContent }) => justifyContent};
`;
