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

export const ActionLayout = ({ startActions, endActions, withPadding }) => {
  return startActions || endActions ? (
    <Box paddingLeft={withPadding ? 10 : 0} paddingRight={withPadding ? 10 : 0}>
      <Box paddingBottom={4}>
        <Row justifyContent="space-between">
          {startActions && <BlockActions wrap="wrap">{startActions}</BlockActions>}
          {endActions && (
            <BlockActions pullRight wrap="wrap">
              {endActions}
            </BlockActions>
          )}
        </Row>
      </Box>
    </Box>
  ) : null;
};

ActionLayout.defaultProps = {
  endActions: undefined,
  startActions: undefined,
  withPadding: true,
};

ActionLayout.propTypes = {
  endActions: PropTypes.node,
  startActions: PropTypes.node,
  withPadding: PropTypes.bool,
};
