import * as React from 'react';

import { styled, type CSSProperties } from 'styled-components';

import {
  handleResponsiveValues,
  type ResponsiveProperty,
  type ResponsiveThemeProperty,
} from '../../helpers/handleResponsiveValues';
import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxComponent, BoxProps } from '../Box';

interface TransientFlexProps {
  alignItems?: ResponsiveProperty<CSSProperties['alignItems']>;
  justifyContent?: ResponsiveProperty<CSSProperties['justifyContent']>;
  wrap?: ResponsiveProperty<CSSProperties['flexWrap']>;
  direction?: ResponsiveProperty<CSSProperties['flexDirection']>;
  gap?: ResponsiveThemeProperty<'spaces', 'gap'>;
  inline?: boolean;
}

type FlexProps<C extends React.ElementType = 'div'> = BoxProps<C> & TransientFlexProps;

const Flex = forwardRef(<C extends React.ElementType = 'div'>(props: FlexProps<C>, ref: PolymorphicRef<C>) => {
  const { className, alignItems, direction, inline, gap, justifyContent, wrap, ...rest } = props;
  const mappedProps = {
    $alignItems: alignItems,
    $direction: direction,
    $gap: gap,
    $justifyContent: justifyContent,
    $wrap: wrap,
    $inline: inline,
  };

  // @ts-expect-error fix: Type 'symbol' is not assignable to type `gap?: ResponsiveThemeProperty<'spaces', 'gap'>`;
  return <StyledFlex className={className} ref={ref} {...mappedProps} {...rest} />;
});

type FlexComponent<C extends React.ElementType = 'div'> = typeof Flex<C>;

const StyledFlex = styled<BoxComponent>(Box)<PropsToTransientProps<TransientFlexProps>>`
  ${({ theme, $display = 'flex', $alignItems = 'center', $direction = 'row', ...props }) =>
    handleResponsiveValues(
      {
        gap: props.$gap,
        alignItems: $alignItems,
        justifyContent: props.$justifyContent,
        flexWrap: props.$wrap,
        flexDirection: $direction,
        display: props.$inline ? 'inline-flex' : $display,
      },
      theme,
    )};
`;

export { Flex };
export type { FlexComponent, FlexProps, TransientFlexProps };
