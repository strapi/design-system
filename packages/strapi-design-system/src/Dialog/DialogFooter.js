import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Stack } from '../Stack';

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
      <Stack horizontal spacing={2}>
        {startAction}
        {endAction}
      </Stack>
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
