import React from 'react';
import styled from 'styled-components';
import { RawTbody } from '../RawTable/RawTbody';

const TbodyWrapper = styled(RawTbody)`
  & tr:last-of-type {
    border-bottom: none;
  }
`;

export const Tbody = (props) => {
  return <TbodyWrapper {...props} />;
};
