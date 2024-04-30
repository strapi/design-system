import * as React from 'react';

import { DefaultTheme } from 'styled-components';

import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';

type StatusVariant = 'alternative' | 'danger' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning';
type StatusSize = 'S' | 'M';

interface StatusProps extends BoxProps {
  variant?: StatusVariant;
  /**
   * If `false`, the preceeding bullet of the status won't be displayed.
   * This prop and the bullet will be removed in the next major version.
   */
  showBullet?: boolean; // TODO V2: remove prop and bullet
  size?: StatusSize;
  children: React.ReactNode;
}

const Status = ({ variant = 'primary', showBullet = true, size = 'M', children, ...props }: StatusProps) => {
  const backgroundColor = `${variant}100` satisfies keyof DefaultTheme['colors'];
  const borderColor = `${variant}200` satisfies keyof DefaultTheme['colors'];
  const bulletColor = `${variant}600` satisfies keyof DefaultTheme['colors'];
  const textColor = `${variant}600` satisfies keyof DefaultTheme['colors'];

  const paddingX = size === 'S' ? 2 : 5;
  const paddingY = size === 'S' ? 1 : 4;

  return (
    <Box
      borderColor={borderColor}
      color={textColor}
      background={backgroundColor}
      hasRadius
      paddingTop={paddingY}
      paddingBottom={paddingY}
      paddingLeft={paddingX}
      paddingRight={paddingX}
      {...props}
    >
      {showBullet ? (
        <Flex gap={3}>
          <Box background={bulletColor} width="0.6rem" height="0.6rem" borderRadius="50%" />
          {children}
        </Flex>
      ) : (
        children
      )}
    </Box>
  );
};

export { Status };
export type { StatusProps, StatusSize, StatusVariant };
