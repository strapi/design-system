import * as React from 'react';

import { styled } from 'styled-components';

import { handleResponsiveValues, ResponsiveValue } from '../../helpers/handleResponsiveValues';
import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxComponent, BoxProps } from '../Box';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

type Element = HTMLDivElement;

type Props<C extends React.ElementType = 'div'> = Omit<BoxProps<C>, 'gap'> & {
  gridCols?: number;
  gap?: ResponsiveValue;
};

const Root = forwardRef(<C extends React.ElementType = 'div'>(props: Props<C>, forwardedRef: PolymorphicRef<C>) => {
  const { gap = 0, gridCols = 12, ...rest } = props;

  return <Wrapper ref={forwardedRef} $gap={gap} $gridCols={gridCols} {...rest} />;
}) as Component;

type Component<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(props: Props<T>) => JSX.Element;

const Wrapper = styled<BoxComponent>(Box)<PropsToTransientProps<Required<Pick<Props, 'gridCols' | 'gap'>>>>`
  display: grid;
  grid-template-columns: repeat(${({ $gridCols }) => $gridCols}, 1fr);
  ${({ theme, $gap }) => handleResponsiveValues({ gap: $gap }, theme)}
`;

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

type ItemElement = HTMLDivElement;

type ItemProps<C extends React.ElementType = 'div'> = BoxProps<C> & {
  col?: number;
  s?: number;
  xs?: number;
};

const ItemImpl = forwardRef(
  <C extends React.ElementType = 'div'>({ col, s, xs, ...props }: ItemProps<C>, forwardedRef: PolymorphicRef<C>) => (
    <Item ref={forwardedRef} $col={col} $s={s} $xs={xs} {...props} />
  ),
) as ItemComponent;

type ItemComponent<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(
  props: ItemProps<T>,
) => JSX.Element;

const Item = styled<BoxComponent>(Box)<PropsToTransientProps<ItemProps>>`
  grid-column: span ${({ $col }) => $col ?? 1};
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.tablet} {
    grid-column: span ${({ $s }) => $s};
  }

  ${({ theme }) => theme.mediaQueries.mobile} {
    grid-column: span ${({ $xs }) => $xs};
  }
`;

export { Root, ItemImpl as Item };
export type { Props, Component, Element, ItemProps, ItemElement, ItemComponent };
