import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';
import { Grid, GridItem } from '../Grid';
import styled from 'styled-components';

const FlexBox = styled(Box)`
  flex: 1;
`;

const BlockActions = styled(Row)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[2]};
  }

  margin-left: ${({ pullRight }) => (pullRight ? 'auto' : undefined)};
`;

export const TwoColsLayout = ({ startActions, sideNav, endActions, header, startCol, endCol }) => {
  return (
    <Row alignItems="flex-start">
      {sideNav}
      <FlexBox>
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

          <Grid gap={4}>
            <GridItem col={9} s={12}>
              <Box hasRadius background="neutral0" shadow="tableShadow">
                {startCol}
              </Box>
            </GridItem>
            <GridItem col={3} s={12}>
              <Box hasRadius background="neutral0" shadow="tableShadow">
                {endCol}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </FlexBox>
    </Row>
  );
};

TwoColsLayout.defaultProps = {
  endActions: undefined,
  startActions: undefined,
  sideNav: undefined,
};

TwoColsLayout.propTypes = {
  endActions: PropTypes.node,
  endCol: PropTypes.node,
  header: PropTypes.node.isRequired,
  sideNav: PropTypes.node,
  startActions: PropTypes.node,
  startCol: PropTypes.node.isRequired,
};
