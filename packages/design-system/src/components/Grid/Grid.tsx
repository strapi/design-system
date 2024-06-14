import * as React from 'react';

import { styled } from 'styled-components';

import { handleResponsiveValues, type IndividualResponsiveProperty } from '../../helpers/handleResponsiveValues';
import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxComponent, BoxProps } from '../Box';
import { FlexProps } from '../Flex';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

type Element = HTMLDivElement;

type Props<C extends React.ElementType = 'div'> = BoxProps<C> & {
  gridCols?: number;
  gap?: IndividualResponsiveProperty<'spaces'>;
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

type ItemProps<C extends React.ElementType = 'div'> = FlexProps<C> & {
  col?: number;
  s?: number;
  xs?: number;
  m?: number;
};

const ItemImpl = forwardRef(
  <C extends React.ElementType = 'div'>({ col, s, xs, ...props }: ItemProps<C>, forwardedRef: PolymorphicRef<C>) => (
    <Item ref={forwardedRef} $col={col} $s={s} $xs={xs} {...props} />
  ),
) as ItemComponent;

type ItemComponent<C extends React.ElementType = 'div'> = <T extends React.ElementType = C>(
  props: ItemProps<T>,
) => JSX.Element;

const Item = styled(Box)`
  grid-column: span ${({ $xs }) => $xs ?? 12};
  max-width: 100%;

  ${({ theme }) => theme.breakpoints.small} {
    grid-column: span ${({ $s, $xs }) => $s ?? $xs ?? 12};
  }

  ${({ theme }) => theme.breakpoints.medium} {
    grid-column: span ${({ $m, $s, $xs }) => $m ?? $s ?? $xs ?? 12};
  }

  ${({ theme }) => theme.breakpoints.large} {
    grid-column: span ${({ $col, $m, $s, $xs }) => $col ?? $m ?? $s ?? $xs ?? 12};
  }
`;

export { Root, ItemImpl as Item };
export type { Props, Component, Element, ItemProps, ItemElement, ItemComponent };
