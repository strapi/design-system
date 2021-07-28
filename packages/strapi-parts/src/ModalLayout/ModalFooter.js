import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';

const ModalFooterWrapper = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

const ActionWrapper = styled(Row)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }
`;

export const ModalFooter = ({ startActions, endActions }) => {
  return (
    <ModalFooterWrapper paddingTop={4} paddingBottom={4} paddingLeft={5} paddingRight={5} background="neutral100">
      <Row justifyContent="space-between">
        <ActionWrapper>{startActions}</ActionWrapper>
        <ActionWrapper>{endActions}</ActionWrapper>
      </Row>
    </ModalFooterWrapper>
  );
};

ModalFooter.defaultProps = {
  endActions: undefined,
  startActions: undefined,
};

ModalFooter.propTypes = {
  endActions: PropTypes.node,
  startActions: PropTypes.node,
};
