import React from "react";
import { Main, SkipToContent } from "@strapi/design-system/Main";
import { Box } from "@strapi/design-system/Box";

export const AdminLayout = ({ children }) => {
  return (
    <Box
      background="neutral100"
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={11}
      paddingRight={11}
    >
      <SkipToContent>Skip to content</SkipToContent>
      <Main labelledBy="main-title">{children}</Main>
    </Box>
  );
};
