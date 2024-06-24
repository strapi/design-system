import * as React from 'react';

import { styled, type CSSProperties } from 'styled-components';

import {
  handleResponsiveValues,
  type ResponsiveProperty,
  type ResponsiveThemeProperty,
} from '../../helpers/handleResponsiveValues';
import { ellipsis, variant, type TEXT_VARIANTS } from '../../styles/type';
import { PolymorphicComponentPropsWithRef, PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { Box, BoxComponent, BoxProps } from '../Box';

interface TransientTypographyProps {
  ellipsis?: boolean;
  textColor?: ResponsiveThemeProperty<'colors', 'color'>;
  textDecoration?: ResponsiveProperty<CSSProperties['textDecoration']>;
  variant?: (typeof TEXT_VARIANTS)[number];
}

type TypographyProps<C extends React.ElementType = 'span'> = Omit<BoxProps<C>, 'ref'> & TransientTypographyProps;

const Typography = forwardRef(
  <C extends React.ElementType = 'span'>(props: TypographyProps<C>, ref: PolymorphicRef<C>) => {
    const {
      ellipsis,
      textColor = 'currentcolor',
      textDecoration,
      textTransform,
      variant,
      lineHeight,
      fontWeight,
      fontSize,
      ...rest
    } = props;

    const mappedProps = {
      $ellipsis: ellipsis,
      $textColor: textColor,
      $textDecoration: textDecoration,
      $textTransform: textTransform,
      $variant: variant,
      $lineHeight: lineHeight,
      $fontWeight: fontWeight,
      $fontSize: fontSize,
    };

    return <StyledTypography ref={ref} tag="span" {...mappedProps} {...rest} />;
  },
) as TypographyComponent;

type TypographyComponent<C extends React.ElementType = 'span'> = <T extends React.ElementType = C>(
  props: PolymorphicComponentPropsWithRef<T, TypographyProps<T>>,
) => JSX.Element;

const StyledTypography = styled<BoxComponent<'span'>>(Box)<PropsToTransientProps<TransientTypographyProps>>`
  ${variant}
  ${({ $ellipsis }) => ($ellipsis ? ellipsis : '')}

  ${({ theme, ...props }) => {
    return handleResponsiveValues(
      {
        color: props.$textColor,
        textDecoration: props.$textDecoration,
        textTransform: props.$textTransform,
        lineHeight: props.$lineHeight,
        fontWeight: props.$fontWeight,
        fontSize: props.$fontSize,
      },
      theme,
    );
  }}
`;

export { Typography };
export type { TypographyProps, TypographyComponent, TransientTypographyProps };
