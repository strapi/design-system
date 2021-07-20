import React from "react";
import { Row, Box } from "@strapi/design-system";
import { SideNav } from "../shared/SideNav";

export const AppLayout = ({ children, subNav }) => {
  return (
    <Box background="neutral100">
      <Row alignItems="flex-start">
        <Box style={{ height: "100vh" }}>
          <SideNav />
        </Box>

        <Box style={{ height: "100vh" }}>{subNav}</Box>

        <Box style={{ flex: 1 }}>{children}</Box>
      </Row>
    </Box>
  );
};
