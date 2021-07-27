import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { RawTh, RawTd } from '../RawTable/RawCell';

const CellWrapper = styled(RawTd)`
  vertical-align: middle;
  line-height: ${52 / 16}rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.neutral600};
  outline-offset: -4px;

  /**
  * Hack to make sure the checkbox looks aligned
  */
  input {
    vertical-align: sub;
  }
`;

export const Th = ({ children, ...props }) => {
  return (
    <CellWrapper as={RawTh} {...props}>
      {children}
    </CellWrapper>
  );
};

Th.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Td = (props) => {
  return <CellWrapper {...props} />;
};
