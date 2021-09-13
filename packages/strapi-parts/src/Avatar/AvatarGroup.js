import styled from 'styled-components';
import { Row } from '../Row';
import { avatarSize } from './constants';

export const AvatarGroup = styled(Row)`
  & > * + * {
    margin-left: -${avatarSize / 2}px;
  }
`;
