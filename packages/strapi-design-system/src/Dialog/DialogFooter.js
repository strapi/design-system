import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';

const FooterWrapper = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};

  button {
    width: 100%;
    display: inline-flex;
    justify-content: center;
  }
`;

export const DialogFooter = ({ startAction, endAction }) => {
  return (
    <FooterWrapper padding={4}>
      <Flex gap={2}>
        {startAction}
        {endAction}
      </Flex>
    </FooterWrapper>
  );
};

DialogFooter.displayName = 'DialogFooter';

DialogFooter.defaultProps = {
  endAction: undefined,
  startAction: undefined,
};

DialogFooter.propTypes = {
  endAction: PropTypes.node,
  startAction: PropTypes.node,
};
