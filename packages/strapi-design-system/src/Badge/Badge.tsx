import { styled, type DefaultTheme } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography } from '../Typography';

const Base = styled<FlexComponent>(Flex)<{ $size: BadgeSize }>`
  border-radius: ${({ theme, $size }) => ($size === 'S' ? '2px' : theme.borderRadius)};
  height: ${({ $size, theme }) => theme.sizes.badge[$size]};
`;

export type BadgeSize = 'S' | 'M';

export interface BadgeProps extends FlexProps {
  /**
   * If `true`, it changes the `backgroundColor` to `primary200` and the `textColor` to `primary600`
   */
  active?: boolean;
  backgroundColor?: keyof DefaultTheme['colors'];
  size?: BadgeSize;
  textColor?: keyof DefaultTheme['colors'];
}

export const Badge = ({
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
      <Typography variant="sigma" textColor={active ? 'primary600' : textColor}>
        {children}
      </Typography>
    </Base>
  );
};
