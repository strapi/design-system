import React from 'react';
import styled from 'styled-components';
import { RawTr } from '../RawTable/RawTr';

const TrWrapper = styled(RawTr)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};

  & td,
  & th {
    padding: ${({ theme }) => theme.spaces[4]};
  }

  & td:first-of-type,
  & th:first-of-type {
    padding: 0 ${({ theme }) => theme.spaces[1]};
  }

  // Resetting padding values and fixing a height
  th {
    padding-top: 0;
    padding-bottom: 0;
    height: ${56 / 16}rem;
  }
`;

export const Tr = (props) => {
  return <TrWrapper {...props} />;
};
