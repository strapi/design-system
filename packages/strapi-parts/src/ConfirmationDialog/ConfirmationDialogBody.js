import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';

const IconContainer = styled(Box)`
  svg {
    width: ${({ theme }) => theme.spaces[6]};
    height: ${({ theme }) => theme.spaces[6]};

    path {
      fill: ${({ theme }) => theme.colors.danger600};
    }
  }
`;

export const ConfirmationDialogBody = ({ children, icon }) => {
  return (
    <Box paddingTop={8} paddingBottom={8} paddingLeft={6} paddingRight={6}>
      {icon && (
        <IconContainer paddingBottom={2}>
          <Row justifyContent="center">{icon}</Row>
        </IconContainer>
      )}
      {children}
    </Box>
  );
};

ConfirmationDialogBody.displayName = 'ConfirmationDialog';

ConfirmationDialogBody.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
};
