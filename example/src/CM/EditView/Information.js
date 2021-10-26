import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Text } from "@strapi/design-system/Text";
import { Flex } from "@strapi/design-system/Flex";
import { Divider } from "@strapi/design-system/Divider";

export const Information = () => {
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
        Information
      </Text>

      <Box paddingTop={2} paddingBottom={4}>
        <Divider />
      </Box>

      <Stack size={3}>
        <Flex justifyContent="space-between">
          <Text textColor="neutral800" bold small>
            Last update
          </Text>

          <Text small>3 months ago</Text>
        </Flex>

        <Flex justifyContent="space-between">
          <Text textColor="neutral800" small bold>
            By
          </Text>

          <Text small>Kai Doe</Text>
        </Flex>
      </Stack>
    </Box>
  );
};
