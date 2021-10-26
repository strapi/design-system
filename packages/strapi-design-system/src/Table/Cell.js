import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';
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

const ActionWrapper = styled.span`
  svg {
    height: ${4 / 16}rem;
  }
`;

export const Th = ({ children, action, ...props }) => {
  return (
    <CellWrapper as={RawTh} {...props}>
      <Flex>
        {children}
        <ActionWrapper>{action}</ActionWrapper>
      </Flex>
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
