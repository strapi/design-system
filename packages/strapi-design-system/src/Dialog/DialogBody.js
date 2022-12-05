import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Flex } from '../Flex';

const IconContainer = styled(Box)`
  svg {
    width: ${({ theme }) => theme.spaces[6]};
    height: ${({ theme }) => theme.spaces[6]};

    path {
      fill: ${({ theme }) => theme.colors.danger600};
    }
  }
`;

export const DialogBody = ({ children, icon }) => {
  return (
    <Box paddingTop={8} paddingBottom={8} paddingLeft={6} paddingRight={6}>
      {icon && (
        <IconContainer paddingBottom={2}>
          <Flex justifyContent="center">{icon}</Flex>
        </IconContainer>
      )}
      {children}
    </Box>
  );
};

DialogBody.displayName = 'DialogBody';

DialogBody.defaultProps = {
  icon: undefined,
};

DialogBody.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
};
