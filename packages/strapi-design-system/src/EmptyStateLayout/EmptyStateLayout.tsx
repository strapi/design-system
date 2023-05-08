import styled from 'styled-components';

import { Box } from '../Box';
import { Flex, FlexProps } from '../Flex';
import { Typography } from '../Typography';

export interface EmptyStateLayoutProps extends Pick<FlexProps, 'hasRadius' | 'shadow'> {
  action?: React.ReactNode;
  content: string;
  icon: React.ReactNode;
}

const EmptyStateIconWrapper = styled(Box)`
  svg {
    height: ${88 / 16}rem;
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
      <EmptyStateIconWrapper paddingBottom={6} aria-hidden>
        {icon}
      </EmptyStateIconWrapper>

      <Box paddingBottom={4}>
        <Typography variant="delta" as="p" textAlign="center" textColor="neutral600">
          {content}
        </Typography>
      </Box>

      {action}
    </Flex>
  );
};
