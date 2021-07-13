import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';
import { Grid, GridItem } from '../Grid';
import styled from 'styled-components';

const BlockActions = styled(Row)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }

  margin-left: ${({ pullRight }) => (pullRight ? 'auto' : undefined)};
`;

export const TwoColsLayout = ({ startActions, endActions, header, startCol, endCol }) => {
  return (
    <Box>
      {header}
      <Box paddingLeft={10} paddingRight={10}>
        {startActions || endActions ? (
          <Box paddingBottom={4}>
            <Row justifyContent="space-between">
              {startActions && <BlockActions>{startActions}</BlockActions>}
              {endActions && <BlockActions pullRight>{endActions}</BlockActions>}
            </Row>
          </Box>
        ) : null}

        <Grid gap={5}>
          <GridItem col={8} s={12}>
            <Box hasRadius background="neutral0" shadow="tableShadow">
              {startCol}
            </Box>
          </GridItem>
          <GridItem col={4} s={12}>
            <Box hasRadius background="neutral0" shadow="tableShadow">
              {endCol}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

TwoColsLayout.defaultProps = {
  endActions: undefined,
  startActions: undefined,
};

TwoColsLayout.propTypes = {
  endActions: PropTypes.node,
  endCol: PropTypes.node,
  header: PropTypes.node.isRequired,
  startActions: PropTypes.node,
  startCol: PropTypes.node.isRequired,
};
