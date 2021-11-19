import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${(props) => (props.active ? props.theme.colors.primary600 : props.theme.colors.neutral600)};
  font-size: ${(props) => `${props.size}px`};
  display: flex;
  align-content: center;
  padding: ${(props) => `${props.padding}px 0`};
  text-decoration: none;
`;

export default StyledLink;
