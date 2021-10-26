import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Flex } from '../Flex';

const StartBlockActions = styled(Flex)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }

  margin-left: ${({ pullRight }) => (pullRight ? 'auto' : undefined)};
`;

const EndBlockActions = styled(StartBlockActions)`
  flex-shrink: 0;
`;

export const ActionLayout = ({ startActions, endActions }) => {
  return startActions || endActions ? (
    <Box paddingLeft={10} paddingRight={10}>
      <Box paddingBottom={4}>
        <Flex justifyContent="space-between" alignItems="flex-start">
          {startActions && <StartBlockActions wrap="wrap">{startActions}</StartBlockActions>}
          {endActions && <EndBlockActions pullRight>{endActions}</EndBlockActions>}
        </Flex>
      </Box>
    </Box>
  ) : null;
};

ActionLayout.defaultProps = {
  endActions: undefined,
  startActions: undefined,
};

ActionLayout.propTypes = {
  endActions: PropTypes.node,
  startActions: PropTypes.node,
};
