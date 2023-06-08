import React from 'react';

import styled from 'styled-components';

import { RawThead, RawTheadProps } from '../RawTable/RawThead';

const TheadWrapper = styled(RawThead)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const Thead = ({ children, ...props }: RawTheadProps) => {
  return <TheadWrapper {...props}>{children}</TheadWrapper>;
};
