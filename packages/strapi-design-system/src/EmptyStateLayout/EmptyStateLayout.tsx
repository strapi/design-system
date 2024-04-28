import { styled } from 'styled-components';

import { Box, BoxComponent } from '../Box';
import { Flex, FlexProps } from '../Flex';
import { Typography } from '../Typography';

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
