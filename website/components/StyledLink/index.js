import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${({ theme, active }) => (active ? theme.colors.primary600 : theme.colors.neutral600)};
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme, padding }) => `${theme.spaces[padding]} 0`};
  font-weight: ${({ theme, active }) => (active ? theme.fontWeights.bold : theme.fontWeights.regular)};
  text-decoration: none;

  svg {
    width: 10px;
    height: 10px;
  }
`;

export default StyledLink;
