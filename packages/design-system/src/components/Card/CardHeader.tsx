import { styled } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';

const CardHeaderWrapper = styled<FlexComponent>(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export type CardHeaderProps = FlexProps;

export const CardHeader = (props: CardHeaderProps) => {
  return <CardHeaderWrapper position="relative" justifyContent="center" {...props} />;
};
