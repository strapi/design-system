import * as React from 'react';

import { styled, type CSSProperties } from 'styled-components';

import { handleResponsiveValues, ResponsiveValue } from '../../helpers/handleResponsiveValues';
import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxComponent, BoxProps } from '../Box';

interface TransientFlexProps extends Pick<CSSProperties, 'alignItems' | 'justifyContent'> {
  direction?: CSSProperties['flexDirection'];
  /**
   * Supports responsive values
   */
  gap?: ResponsiveValue;
  inline?: boolean;
  wrap?: CSSProperties['flexWrap'];
}

type FlexProps<C extends React.ElementType = 'div'> = BoxProps<C> & TransientFlexProps;

const Flex = forwardRef(<C extends React.ElementType = 'div'>(props: FlexProps<C>, ref: PolymorphicRef<C>) => {
  const { className, alignItems, direction, gap, inline, justifyContent, wrap, ...rest } = props;
  const mappedProps = {
    $alignItems: alignItems,
    $direction: direction,
    $gap: gap,
    $inline: inline,
    $justifyContent: justifyContent,
    $wrap: wrap,
  };

  return <StyledFlex className={className} ref={ref} {...mappedProps} {...rest} />;
});

type FlexComponent<C extends React.ElementType = 'div'> = typeof Flex<C>;

const StyledFlex = styled<BoxComponent>(Box)<PropsToTransientProps<TransientFlexProps>>`
  align-items: ${({ $alignItems = 'center' }) => $alignItems};
  display: ${({ display = 'flex', $inline }) => ($inline ? 'inline-flex' : display)};
  flex-direction: ${({ $direction = 'row' }) => $direction};
  flex-shrink: ${({ shrink }) => shrink};
  flex-wrap: ${({ $wrap }) => $wrap};
  ${({ $gap, theme }) => handleResponsiveValues({ gap: $gap }, theme)};
  justify-content: ${({ $justifyContent }) => $justifyContent};
`;

export { Flex };
export type { FlexComponent, FlexProps, TransientFlexProps };
