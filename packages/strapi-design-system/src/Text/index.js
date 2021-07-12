import React from 'react';
import styled from 'styled-components';

const handleColor = ({ theme, textColor }) => theme.colors[textColor];

export const H1 = styled.h1`
  font-weight: 600;
  font-size: ${32 / 16}rem;
  line-height: 1.25;
  color: ${handleColor};
`;

export const H2 = styled.h2`
  font-weight: 600;
  font-size: ${18 / 16}rem;
  line-height: 1.22;
  color: ${handleColor};
`;

export const H3 = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25;
  color: ${handleColor};
`;

const textStyles = {
  S: {
    fontSize: `${12 / 16}rem`,
    lineHeight: 1.33,
  },
  M: {
    fontSize: `${14 / 16}rem`,
    lineHeight: 1.43,
  },
};

export const Text = styled.span`
  font-weight: ${({ highlighted }) => (highlighted ? 500 : 400)};
  font-size: ${({ small }) => textStyles[small ? 'S' : 'M'].fontSize};
  line-height: ${({ small }) => textStyles[small ? 'S' : 'M'].lineHeight};
  color: ${handleColor};
`;

export const P = (props) => <Text as="p" {...props} />;

export const Subtitle = styled(Text)`
  font-size: 1rem;
  line-height: 1.5;
`;

export const TextButton = styled(Text)`
  font-weight: 600;
  line-height: 1.14;
`;

export const TableLabel = styled(TextButton)`
  font-weight: 600;
  font-size: ${11 / 16}rem;
  line-height: 1.45;
  text-transform: uppercase;
`;
