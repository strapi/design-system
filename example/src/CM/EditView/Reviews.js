import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Text } from "@strapi/design-system/Text";

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
      <Text textColor="neutral700" as="h3" bold>
        Reviews (7)
      </Text>
    </Box>
  );
};
