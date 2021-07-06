import React from 'react';
import styled from 'styled-components';
import { Row } from '../Row';

const CardHeaderWrapper = styled(Row)`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const CardHeader = (props) => {
  return <CardHeaderWrapper justifyContent="center" {...props} />;
};
