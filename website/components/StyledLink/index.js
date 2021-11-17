import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${(props) => (props.active ? 'var(--Primary600)' : 'var(--Neutral600)')};
  font-size: ${(props) => `${props.size}px`};
  display: flex;
  align-content: center;
  padding: ${(props) => `${props.padding}px 0`};
`;

export default StyledLink;
