import React from "react";
import { Main, SkipToContent } from "@strapi/design-system/Main";
import { Box } from "@strapi/design-system/Box";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { SideNav } from "../shared/SideNav";

export const OneBlockLayout = ({ children, header }) => {
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to content</SkipToContent>

      <Grid>
        <GridItem col={2} hiddenS style={{ height: "100vh" }}>
          <SideNav />
        </GridItem>
        <GridItem col={10} s={12} paddingRight={[10, 0]}>
          <Main labelledBy="main-title">
            <Box paddingBottom={[8, 4]} paddingTop={[8, 4]}>
              {header}
            </Box>

            <Box background="neutral0" shadow="filterShadow" hasRadius>
              {children}
            </Box>
          </Main>
        </GridItem>
      </Grid>
    </Box>
  );
};
