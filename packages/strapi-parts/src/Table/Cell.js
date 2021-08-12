import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row } from '../Row';
import { RawTh, RawTd } from '../RawTable/RawCell';

const CellWrapper = styled(RawTd)`
  vertical-align: middle;
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

const ThWrapper = styled(CellWrapper)`
  svg {
    height: ${4 / 16}rem;
  }
`;

export const Th = ({ children, action, ...props }) => {
  return (
    <ThWrapper as={RawTh} {...props}>
      <Row>
        {children}
        {action}
      </Row>
    </ThWrapper>
  );
};

Th.defaultProps = {
  action: undefined,
};

Th.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export const Td = (props) => {
  return <CellWrapper {...props} />;
};
