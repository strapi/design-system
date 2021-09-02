import React from "react";
import { Box } from "@strapi/parts/Box";
import { Stack } from "@strapi/parts/Stack";
import { Text } from "@strapi/parts/Text";
import { Row } from "@strapi/parts/Row";
import { Divider } from "@strapi/parts/Divider";

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
        <Row justifyContent="space-between">
          <Text textColor="neutral800" bold small>
            Last update
          </Text>

          <Text small>3 months ago</Text>
        </Row>

        <Row justifyContent="space-between">
          <Text textColor="neutral800" small bold>
            By
          </Text>

          <Text small>Kai Doe</Text>
        </Row>
      </Stack>
    </Box>
  );
};
