import { styled } from 'styled-components';

import { Flex, FlexComponent } from '../Flex';

import { avatarSize } from './constants';

export const AvatarGroup = styled<FlexComponent>(Flex)`
  & > * + * {
    margin-left: -${avatarSize / 2}px;
  }
`;
