import * as React from 'react';

import { DefaultTheme } from 'styled-components';

import { Box, BoxProps } from '../../primitives/Box';

type StatusVariant = 'alternative' | 'danger' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning';
type StatusSize = 'XS' | 'S' | 'M';

interface StatusProps extends BoxProps {
  variant?: StatusVariant;
  size?: StatusSize;
  children: React.ReactNode;
}

const getPadding = (size: StatusSize): { paddingX: BoxProps['paddingTop']; paddingY: BoxProps['paddingLeft'] } => {
  if (size === 'XS') {
    return { paddingX: '0.6rem', paddingY: '0.2rem' };
  }

  if (size === 'S') {
    return { paddingX: 2, paddingY: 1 };
  }

  // Size M
  return { paddingX: 5, paddingY: 4 };
};

const Status = ({ variant = 'primary', size = 'M', children, ...props }: StatusProps) => {
  const backgroundColor = `${variant}100` satisfies keyof DefaultTheme['colors'];
  const borderColor = `${variant}200` satisfies keyof DefaultTheme['colors'];
  const textColor = `${variant}600` satisfies keyof DefaultTheme['colors'];

  const { paddingX, paddingY } = getPadding(size);

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
      {children}
    </Box>
  );
};

export { Status };
export type { StatusProps, StatusSize, StatusVariant };
