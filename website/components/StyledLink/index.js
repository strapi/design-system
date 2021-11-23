import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${({ theme, active }) => (active ? theme.colors.primary600 : theme.colors.neutral600)};
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  display: flex;
  align-content: center;
  padding: ${({ theme, padding }) => `${theme.spaces[padding]} 0`};
  text-decoration: none;
`;

export default StyledLink;
