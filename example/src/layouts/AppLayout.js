import React from "react";
import { Row, Box, SkipToContent } from "@strapi/parts";
import { SideNav } from "../shared/SideNav";

export const AppLayout = ({ children, subNav }) => {
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to main content</SkipToContent>
      <Row alignItems="flex-start">
        <SideNav />
        {subNav}
        <Box style={{ flex: 1 }}>{children}</Box>
      </Row>
    </Box>
  );
};
