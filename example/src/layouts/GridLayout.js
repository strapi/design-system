import React from "react";
import { Main, SkipToContent } from "@strapi/design-system/Main";
import { Box } from "@strapi/design-system/Box";
import { Grid } from "@strapi/design-system/Grid";
import { SideNav } from "../shared/SideNav";

export const GridLayout = ({ children, header }) => {
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to content</SkipToContent>

      <Grid cols="auto 1fr" style={{ height: "100vh" }}>
        <SideNav />

        <Box padding={11}>
          <Main labelledBy="main-title">
            <Box paddingBottom={8}>{header}</Box>

            <Grid
              cols="repeat(auto-fit, minmax(min(250px, 100%), 1fr));"
              gap={6}
            >
              {children}
            </Grid>
          </Main>
        </Box>
      </Grid>
    </Box>
  );
};
