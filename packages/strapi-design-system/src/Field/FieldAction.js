import styled from 'styled-components';

export const FieldAction = styled.button`
  border: none;
  background: transparent;
  // TODO: Make sure to use the theme when it's ready
  font-size: 1.6rem;
  margin-left: -100%;
  transform: translateX(-${({ theme }) => theme.spaces[3]});
  width: auto;
  padding: 0;
  display: flex;
  align-items: center;
`;
