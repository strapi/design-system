import styled from 'styled-components';

import { Badge, BadgeProps } from '../Badge';

const CardBadgeWrapper = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;

const BadgePosition = styled(Badge)`
  margin-left: ${({ theme }) => theme.spaces[1]};
`;

export type CardBadgeProps = BadgeProps;

export const CardBadge = (props: CardBadgeProps) => (
  <CardBadgeWrapper>
    <BadgePosition {...props} />
  </CardBadgeWrapper>
);
