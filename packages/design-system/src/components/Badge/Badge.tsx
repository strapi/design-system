import { css, styled, DefaultTheme } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { DefaultThemeOrCSSProp } from '../../types';

type BadgeSize = 'S' | 'M';

type BadgeVariant = 'success' | 'primary' | 'danger' | 'warning' | 'neutral' | 'secondary' | 'alternative';

interface BadgeProps extends FlexProps {
  /**
   * If `true`, it changes the `backgroundColor` to `primary200` and the `textColor` to `primary600`
   */
  active?: boolean;

  /**
   * @deprecated Visual colors are now controlled by `variant`.
   */
  backgroundColor?: DefaultThemeOrCSSProp<'colors', 'background'>;
  /**
   * @default 'M'
   */
  size?: BadgeSize;

  /**
   * @deprecated Visual colors are now controlled by `variant`.
   */
  textColor?: DefaultThemeOrCSSProp<'colors', 'color'>;

  /**
   * @default 'neutral'
   */
  variant?: BadgeVariant;
}

const Badge = ({
  active = false,
  size = 'M',
  textColor,
  backgroundColor,
  variant = 'neutral',
  children,
  minWidth = 5,
  ...props
}: BadgeProps) => {
  const paddingX = size === 'S' ? 1 : 2;

  const backgroundColorDerived = backgroundColor
    ? backgroundColor
    : (`${variant}200` satisfies keyof DefaultTheme['colors']);
  const textColorDerived = textColor ? textColor : (`${variant}700` satisfies keyof DefaultTheme['colors']);

  return (
    <Base
      inline
      alignItems="center"
      justifyContent="center"
      minWidth={minWidth}
      paddingLeft={paddingX}
      paddingRight={paddingX}
      background={active ? 'primary200' : backgroundColorDerived}
      $size={size}
      {...props}
    >
      <Typography variant="sigma" textColor={active ? 'primary600' : textColorDerived} lineHeight="1rem">
        {children}
      </Typography>
    </Base>
  );
};

const Base = styled<FlexComponent>(Flex)<{ $size: BadgeSize }>`
  border-radius: ${({ theme, $size }) => ($size === 'S' ? '2px' : theme.borderRadius)};
  ${({ $size, theme }) => {
    if ($size === 'S') {
      return css`
        padding-block: 0.3rem;
        padding-inline ${theme.spaces[1]}
      `;
    }

    return css`
      padding-block: 0.7rem;
      padding-inline ${theme.spaces[2]}
    `;
  }};
`;

export { Badge };
export type { BadgeProps, BadgeSize };
