import React from "react";
import { SkipToContent, Main, Box } from "@strapi/design-system";

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
