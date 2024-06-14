import { styled } from 'styled-components';

import { Box, BoxComponent } from '../../primitives/Box';
import { Flex, FlexProps } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';

export interface EmptyStateLayoutProps extends Pick<FlexProps, 'hasRadius' | 'shadow'> {
  action?: React.ReactNode;
  content: string;
  icon?: React.ReactNode;
}

const EmptyStateIconWrapper = styled<BoxComponent>(Box)`
  svg {
    height: 8.8rem;
  }
`;

export const EmptyStateLayout = ({
  icon,
  content,
  action,
  hasRadius = true,
  shadow = 'tableShadow',
}: EmptyStateLayoutProps) => {
  return (
    <Flex
      alignItems="center"
      direction="column"
      padding={11}
      background="neutral0"
      hasRadius={hasRadius}
      shadow={shadow}
    >
      {icon ? (
        <EmptyStateIconWrapper paddingBottom={6} aria-hidden>
          {icon}
        </EmptyStateIconWrapper>
      ) : null}

      <Box paddingBottom={4}>
        <Typography variant="delta" tag="p" textAlign="center" textColor="neutral600">
          {content}
        </Typography>
      </Box>

      {action}
    </Flex>
  );
};
