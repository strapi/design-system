import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Grid, GridItem } from '../Grid';

export const TwoColsLayout = ({ startCol, endCol }) => {
  return (
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
  );
};

TwoColsLayout.propTypes = {
  endCol: PropTypes.node.isRequired,
  startCol: PropTypes.node.isRequired,
};
