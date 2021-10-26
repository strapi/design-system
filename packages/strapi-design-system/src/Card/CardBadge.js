import React from 'react';
import styled from 'styled-components';
import { Badge } from '../Badge';

const CardBadgeWrapper = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;

const BadgePosition = styled(Badge)`
  margin-left: ${({ theme }) => theme.spaces[1]};
`;

export const CardBadge = (props) => (
  <CardBadgeWrapper>
    <BadgePosition {...props} />
  </CardBadgeWrapper>
);
