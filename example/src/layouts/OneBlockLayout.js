import React from "react";
import { Main, SkipToContent } from "@strapi/design-system/Main";
import { Box } from "@strapi/design-system/Box";
import { Grid } from "@strapi/design-system/Grid";
import { SideNav } from "../shared/SideNav";

export const OneBlockLayout = ({ children, header }) => {
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to content</SkipToContent>

      <Grid cols="auto 1fr" style={{ height: "100vh" }}>
        <SideNav />

        <Box padding={11}>
          <Main labelledBy="main-title">
            <Box paddingBottom={8}>{header}</Box>

            <Box background="neutral0" shadow="filterShadow" hasRadius>
              {children}
            </Box>
          </Main>
        </Box>
      </Grid>
    </Box>
  );
};
