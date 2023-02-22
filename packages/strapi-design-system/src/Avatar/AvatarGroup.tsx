import styled from 'styled-components';

import { avatarSize } from './constants';
import { Flex } from '../Flex';

export const AvatarGroup = styled(Flex)`
  & > * + * {
    margin-left: -${avatarSize / 2}px;
  }
`;
