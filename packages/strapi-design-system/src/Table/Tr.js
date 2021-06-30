import React from 'react';
import styled from 'styled-components';
import { RawTr } from '../RawTable/RawTr';

const TrWrapper = styled(RawTr)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const Tr = (props) => {
  return <TrWrapper {...props} />;
};
