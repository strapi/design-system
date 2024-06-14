import { css, styled, type DefaultTheme } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';

type BadgeSize = 'S' | 'M';

interface BadgeProps extends FlexProps {
  /**
   * If `true`, it changes the `backgroundColor` to `primary200` and the `textColor` to `primary600`
   */
  active?: boolean;
  backgroundColor?: keyof DefaultTheme['colors'];
  /**
   * @default 'M'
   */
  size?: BadgeSize;
  textColor?: keyof DefaultTheme['colors'];
}

const Badge = ({
  active = false,
  size = 'M',
  textColor = 'neutral600',
  backgroundColor = 'neutral150',
  children,
  minWidth = 5,
  ...props
}: BadgeProps) => {
  const paddingX = size === 'S' ? 1 : 2;

  return (
    <Base
      inline
      alignItems="center"
      justifyContent="center"
      minWidth={minWidth}
      paddingLeft={paddingX}
      paddingRight={paddingX}
      background={active ? 'primary200' : backgroundColor}
      $size={size}
      {...props}
    >
      <Typography variant="sigma" textColor={active ? 'primary600' : textColor} lineHeight="1rem">
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
