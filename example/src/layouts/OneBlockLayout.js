import React from "react";
import { Main, SkipToContent } from "@strapi/design-system/Main";
import { Box } from "@strapi/design-system/Box";
import { Row } from "@strapi/design-system/Row";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { SideNav } from "../shared/SideNav";
import { SubSideNav } from "../shared/SubSideNav";

export const OneBlockLayout = ({ children, header }) => {
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to content</SkipToContent>
      <Row alignItems="flex-start">
        <Row style={{ height: "100vh" }}>
          <SideNav />
          <SubSideNav />
        </Row>
        <Grid style={{ flex: 1, alignSelf: "stretch" }}>
          <GridItem col={12} paddingLeft={[10, 0]} paddingRight={[10, 0]}>
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
      </Row>
    </Box>
  );
};
