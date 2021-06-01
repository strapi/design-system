import React from "react";
import { Main, SkipToContent } from "@strapi/design-system/Main";
import { Box } from "@strapi/design-system/Box";
import { Grid } from "@strapi/design-system/Grid";
import { SideNav } from "../shared/SideNav";

export const TwoColsLayout = ({ header, start, end }) => {
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to content</SkipToContent>

      <Grid cols="auto 1fr" style={{ height: "100vh" }}>
        <SideNav />

        <Box padding={11}>
          <Main labelledBy="main-title">
            <Box paddingBottom={8}>{header}</Box>

            <Grid cols="3fr 1fr" areas={["start end"]} gap={6}>
              <Box
                style={{ height: "60vh" }}
                background="neutral0"
                shadow="filterShadow"
                hasRadius
                area="start"
              >
                {start}
              </Box>

              <Box
                style={{ height: "30vh" }}
                background="neutral0"
                shadow="filterShadow"
                hasRadius
                area="end"
              >
                {end}
              </Box>
            </Grid>
          </Main>
        </Box>
      </Grid>
    </Box>
  );
};
