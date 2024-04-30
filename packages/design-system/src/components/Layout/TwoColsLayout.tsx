import { Box } from '../Box';
import { Grid, GridItem } from '../Grid';

interface TwoColsLayoutProps {
  endCol: React.ReactNode;
  startCol: React.ReactNode;
}

export const TwoColsLayout = ({ startCol, endCol }: TwoColsLayoutProps) => {
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
