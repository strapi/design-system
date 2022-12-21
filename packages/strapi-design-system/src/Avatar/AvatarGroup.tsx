import styled from 'styled-components';
import { Flex } from '../Flex';
import { avatarSize } from './constants';

export const AvatarGroup = styled(Flex)`
  & > * + * {
    margin-left: -${avatarSize / 2}px;
  }
`;
