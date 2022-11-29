import styled, { CSSProperties, DefaultTheme } from 'styled-components';

import { Box, BoxProps } from '../Box';

import handleResponsiveValues from '../helpers/handleResponsiveValues';

import { PickType } from '../types/utils';

/**
 * Prevents these attributes from being spread on the DOM node
 */
const transientProps: Partial<Record<keyof FlexProps, boolean>> = {
  direction: true,
};

interface FlexProps extends BoxProps {
  alignItems?: PickType<CSSProperties, 'alignItems'>;
  direction?: PickType<CSSProperties, 'flexDirection'>;
  gap?: keyof DefaultTheme['spaces'] | Array<keyof DefaultTheme['spaces']>;
  inline?: boolean;
  justifyContent?: PickType<CSSProperties, 'justifyContent'>;
  wrap?: PickType<CSSProperties, 'flexWrap'>;
}

export const Flex = styled(Box).withConfig<FlexProps>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop as keyof FlexProps] && defPropValFN(prop),
})`
  align-items: ${({ alignItems = 'center' }) => alignItems};
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ direction = 'row' }) => direction};
  flex-shrink: ${({ shrink }) => shrink};
  flex-wrap: ${({ wrap }) => wrap};
  ${({ gap, theme }) => handleResponsiveValues('gap', gap, theme)};
  justify-content: ${({ justifyContent }) => justifyContent};
`;
