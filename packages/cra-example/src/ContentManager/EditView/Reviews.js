import React from "react";
import { Box, Text } from "@strapi/design-system";

export const Reviews = () => {
  return (
    <Box
      hasRadius
      background="neutral0"
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={6}
      paddingRight={6}
      shadow="filterShadow"
    >
      <Text textColor="neutral700" as="h3" highlighted>
        Reviews (7)
      </Text>
    </Box>
  );
};
