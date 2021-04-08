import styled from 'styled-components';

// TODO: modify when necessary
const fontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`;

const handleColor = ({ theme, textColor }) => theme.colors[textColor];

export const H1 = styled.h1`
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: ${32 / 16}rem;
  line-height: 1.25;
  color: ${handleColor};
`;

export const H2 = styled.h2`
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: ${18 / 16}rem;
  line-height: 1.22;
  color: ${handleColor};
`;

export const H3 = styled.h3`
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.25;
  color: ${handleColor};
`;

const textBodyStyles = {
  S: {
    fontSize: `${12 / 16}rem`,
    lineHeight: 1.33,
  },
  M: {
    fontSize: `${14 / 16}rem`,
    lineHeight: 1.43,
  },
};

export const TextBody = styled.p`
  font-family: ${fontFamily};
  font-weight: ${({ highlighted }) => (highlighted ? 500 : 400)};
  font-size: ${({ small }) => textBodyStyles[small ? 'S' : 'M'].fontSize};
  line-height: ${({ small }) => textBodyStyles[small ? 'S' : 'M'].lineHeight};
  color: ${handleColor};
`;

export const Subtitle = styled(TextBody)`
  font-size: 1rem;
  line-height: 1.5;
`;

export const TextButton = styled(TextBody)`
  font-weight: 600;
  line-height: 1.14;
`;

export const TableLabel = styled(TextButton)`
  font-weight: 600;
  font-size: ${11 / 16}rem;
  line-height: 1.45;
  text-transform: uppercase;
`;
