import React from "react";
import { Flex, Box, SkipToContent } from "@strapi/parts";
import { SideNav } from "../shared/SideNav";

export const AppLayout = ({ children, subNav }) => {
  return (
    <Box background="neutral100">
      <SkipToContent>Skip to main content</SkipToContent>
      <Flex alignItems="flex-start">
        <SideNav />
        {subNav}
        <Box style={{ flex: 1 }}>{children}</Box>
      </Flex>
    </Box>
  );
};
