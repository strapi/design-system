import React from 'react';
import styled from 'styled-components';
import { RawTr } from '../RawTable/RawTr';

const TrWrapper = styled(RawTr)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};

  & td,
  & th {
    padding: 0 ${({ theme }) => theme.spaces[4]};
  }

  & td:first-of-type,
  & th:first-of-type {
    padding: 0 ${({ theme }) => theme.spaces[1]};
  }
`;

export const Tr = (props) => {
  return <TrWrapper {...props} />;
};
