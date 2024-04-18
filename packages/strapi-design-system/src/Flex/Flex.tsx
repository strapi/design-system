import * as React from 'react';

import styled, { CSSProperties } from 'styled-components';

import { Box, BoxProps } from '../Box';
import handleResponsiveValues, { ResponsiveValue } from '../helpers/handleResponsiveValues';

type FlexTransientProps = {
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

export type FlexProps<TElement extends keyof JSX.IntrinsicElements = 'div'> = BoxProps<TElement> & FlexTransientProps;

export type StyledFlexProps = Omit<FlexProps, keyof FlexTransientProps> & {
  [key in keyof FlexTransientProps as `$${key}`]: FlexTransientProps[key];
};

export const StyledFlex = styled(Box)<StyledFlexProps>`
  align-items: ${({ $alignItems = 'center' }) => $alignItems};
  display: ${({ display = 'flex', $inline }) => ($inline ? 'inline-flex' : display)};
  flex-direction: ${({ $direction = 'row' }) => $direction};
  flex-shrink: ${({ shrink }) => shrink};
  flex-wrap: ${({ $wrap }) => $wrap};
  ${({ $gap, theme }) => handleResponsiveValues('gap', $gap, theme)};
  justify-content: ${({ $justifyContent }) => $justifyContent};
`;

export const Flex = React.forwardRef(
  <T extends keyof JSX.IntrinsicElements, R>(props: FlexProps<T>, ref: React.ForwardedRef<R>) => {
    const { alignItems, direction, gap, inline, justifyContent, wrap, ...rest } = props;
    const mappedProps = {
      $alignItems: alignItems,
      $direction: direction,
      $gap: gap,
      $inline: inline,
      $justifyContent: justifyContent,
      $wrap: wrap,
    };

    return <StyledFlex ref={ref} {...mappedProps} {...rest} />;
  },
);
