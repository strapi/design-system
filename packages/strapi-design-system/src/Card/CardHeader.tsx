import styled from 'styled-components';

import { Flex, FlexProps } from '../Flex';

const CardHeaderWrapper = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export type CardHeaderProps = FlexProps;

export const CardHeader = (props: CardHeaderProps) => {
  return <CardHeaderWrapper position="relative" justifyContent="center" {...props} />;
};
