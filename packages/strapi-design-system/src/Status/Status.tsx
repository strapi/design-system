import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

interface BulletProps {
  backgroundColor: keyof DefaultTheme['colors'];
}

const Bullet = styled.div<BulletProps>`
  margin-right: ${({ theme }) => theme.spaces[3]};
  width: ${6 / 16}rem;
  height: ${6 / 16}rem;
  border-radius: 50%;
  background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
`;

interface StatusWrapperProps {
  textColor: keyof DefaultTheme['colors'];
}

const StatusWrapper = styled(Box)<StatusWrapperProps>`
  ${Typography} {
    color: ${({ theme, textColor }) => theme.colors[textColor]};
  }
`;

export type StatusVariant = 'alternative' | 'danger' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning';
export type StatusSize = 'S' | 'M';

export interface StatusProps extends BoxProps {
  variant?: StatusVariant;
  /**
   * If `false`, the preceeding bullet of the status won't be displayed.
   * This prop and the bullet will be removed in the next major version.
   */
  showBullet?: boolean; // TODO V2: remove prop and bullet
  size?: StatusSize;
  children: React.ReactNode;
}

export const Status = ({ variant = 'primary', showBullet = true, size = 'M', children, ...props }: StatusProps) => {
  const backgroundColor = `${variant}100` satisfies keyof DefaultTheme['colors'];
  const borderColor = `${variant}200` satisfies keyof DefaultTheme['colors'];
  const bulletColor = `${variant}600` satisfies keyof DefaultTheme['colors'];
  const textColor = `${variant}600` satisfies keyof DefaultTheme['colors'];

  const paddingX = size === 'S' ? 2 : 5;
  const paddingY = size === 'S' ? 1 : 4;

  return (
    <StatusWrapper
      borderColor={borderColor}
      textColor={textColor}
      background={backgroundColor}
      hasRadius
      paddingTop={paddingY}
      paddingBottom={paddingY}
      paddingLeft={paddingX}
      paddingRight={paddingX}
      {...props}
    >
      {showBullet ? (
        <Flex>
          <Bullet backgroundColor={bulletColor} />
          {children}
        </Flex>
      ) : (
        children
      )}
    </StatusWrapper>
  );
};
