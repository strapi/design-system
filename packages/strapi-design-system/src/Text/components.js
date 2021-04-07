import styled from 'styled-components';

// TODO: modify when necessary
const fontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`;

const handleColor = ({ theme, textColor }) => theme.colors[textColor];

export const Header1 = styled.h1`
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: ${32 / 16}rem;
  line-height: 1.25;
  color: ${handleColor};
`;

export const Header2 = styled.h2`
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: ${18 / 16}rem;
  line-height: 1.22;
  color: ${handleColor};
`;

export const Header3 = styled.h3`
  font-family: ${fontFamily};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25;
  color: ${handleColor};
`;

export const Subtitle = styled.p`
  font-family: ${fontFamily};
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  color: ${handleColor};
`;

export const Body = styled.p`
  font-family: ${fontFamily};
  font-weight: 400;
  font-size: ${14 / 16}rem;
  line-height: 1.43;
  color: ${handleColor};
`;

export const BodyHighlight = styled(Body)`
  font-weight: 500;
`;

export const ButtonText = styled.p`
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: ${14 / 16}rem;
  line-height: 1.14;
  color: ${handleColor};
`;

export const SmallText = styled.p`
  font-family: ${fontFamily};
  font-weight: 400;
  font-size: ${12 / 16}rem;
  line-height: 1.33;
  color: ${handleColor};
`;

export const SmallButtonText = styled(SmallText)`
  font-weight: 500;
`;

export const TableLabel = styled.p`
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: ${11 / 16}rem;
  line-height: 1.45;
  text-transform: uppercase;
  color: ${handleColor};
`;
