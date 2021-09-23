import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Row } from '../Row';

const BlockActions = styled(Row)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }

  margin-left: ${({ pullRight }) => (pullRight ? 'auto' : undefined)};
`;

export const ActionLayout = ({ startActions, endActions }) => {
  return startActions || endActions ? (
    <Box paddingLeft={10} paddingRight={10}>
      <Box paddingBottom={4}>
        <Row justifyContent="space-between" alignItems="flex-start">
          {startActions && <BlockActions wrap="wrap">{startActions}</BlockActions>}
          {endActions && <BlockActions pullRight>{endActions}</BlockActions>}
        </Row>
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
