import styled from 'styled-components';

import { avatarSize } from './constants';
import { Flex, FlexComponent } from '../Flex';

export const AvatarGroup = styled<FlexComponent>(Flex)`
  & > * + * {
    margin-left: -${avatarSize / 2}px;
  }
`;
