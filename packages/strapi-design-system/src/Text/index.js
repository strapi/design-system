import React from 'react';
import styled from 'styled-components';
import { ellipsisStyle, handleColor } from './utils';
import { Typography } from '../Typography';

export const H2 = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes[4]};
  line-height: ${({ theme }) => theme.lineHeights[1]};
  color: ${handleColor};
  ${ellipsisStyle}
`;

export const H3 = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  line-height: ${({ theme }) => theme.lineHeights[2]};
  color: ${handleColor};
  ${ellipsisStyle}
`;

const textStyles = {
  S: {
    fontSize: 1,
    lineHeight: 3,
  },
  M: {
    fontSize: 2,
    lineHeight: 4,
  },
};

export const Text = styled.span`
  font-weight: ${({ bold, theme }) => (bold ? theme.fontWeights.semiBold : theme.fontWeights.regular)};
  font-size: ${({ small, theme }) => {
    const fontSize = textStyles[small ? 'S' : 'M'].fontSize;

    return theme.fontSizes[fontSize];
  }};
  line-height: ${({ small, theme }) => {
    const lineHeight = textStyles[small ? 'S' : 'M'].lineHeight;

    return theme.lineHeights[lineHeight];
  }};
  color: ${handleColor};
  ${ellipsisStyle}
`;

export const P = (props) => <Text as="p" {...props} />;

export const Subtitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes[3]};
  line-height: ${({ theme }) => theme.lineHeights[6]};
`;

export const ButtonText = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights[0]};
`;

export const TableLabel = styled(Typography)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  line-height: ${({ theme }) => theme.lineHeights[5]};
  text-transform: uppercase;
`;

export const EllipsisText = styled(Text)`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export * from './H1';
