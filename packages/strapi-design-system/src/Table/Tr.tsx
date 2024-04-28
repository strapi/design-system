import * as React from 'react';

import { styled } from 'styled-components';

import { RawTr, RawTrProps } from '../RawTable/RawTr';

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
    height: 5.6rem;
  }
`;

export const Tr = (props: RawTrProps) => {
  return <TrWrapper {...props} />;
};
