import React from 'react';

import styled from 'styled-components';

import { RawTbody, RawTbodyProps } from '../RawTable/RawTbody';

const TbodyWrapper = styled(RawTbody)`
  & tr:last-of-type {
    border-bottom: none;
  }
`;

export const Tbody = ({ children, ...props }: RawTbodyProps) => {
  return <TbodyWrapper {...props}>{children}</TbodyWrapper>;
};
