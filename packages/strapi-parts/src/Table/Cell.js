import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row } from '../Row';
import { Box } from '../Box';
import { RawTh, RawTd } from '../RawTable/RawCell';

const CellWrapper = styled(RawTd)`
  vertical-align: middle;
  line-height: ${52 / 16}rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.neutral600};
  outline-offset: -4px;

  svg {
    height: ${4 / 16}rem;
  }

  /**
  * Hack to make sure the checkbox looks aligned
  */
  input {
    vertical-align: sub;
  }
`;

export const Th = ({ children, action, ...props }) => {
  return (
    <CellWrapper as={RawTh} {...props}>
      <Row>
        {children}
        {action ? <Box>{action}</Box> : null}
      </Row>
    </CellWrapper>
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
