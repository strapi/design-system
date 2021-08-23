import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Stack } from '../Stack';

const FooterWrapper = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};

  button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const ConfirmationDialogFooter = ({ startAction, endAction }) => {
  return (
    <FooterWrapper padding={4}>
      <Stack horizontal size={2}>
        {startAction}
        {endAction}
      </Stack>
    </FooterWrapper>
  );
};

ConfirmationDialogFooter.displayName = 'ConfirmationDialogFooter';

ConfirmationDialogFooter.defaultProps = {
  endAction: undefined,
  startAction: undefined,
};

ConfirmationDialogFooter.propTypes = {
  endAction: PropTypes.node,
  startAction: PropTypes.node,
};
