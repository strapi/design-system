import * as React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Box, BoxProps } from '../Box';
import { extractStyleFromTheme } from '../helpers/theme';

interface IconWrapperProps extends Omit<IconProps, 'colors'> {
  $colors: NonNullable<IconProps['colors']>;
}

const IconWrapper = styled(Box)<IconWrapperProps>`
  path {
    fill: ${({ color, theme }) => extractStyleFromTheme(theme.colors, color, undefined)};
  }
  ${({ theme, $colors }) => $colors(theme)}
`;

interface IconProps extends BoxProps {
  colors?: (theme: DefaultTheme) => string;
}

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ $color = 'neutral600', colors = () => '', ...restProps }, ref) => {
    return <IconWrapper ref={ref} $color={$color} $colors={colors} {...restProps} />;
  },
);

Icon.displayName = 'Icon';

export { Icon };
export type { IconProps };
