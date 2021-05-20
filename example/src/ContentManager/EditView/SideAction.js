import React from "react";
import { Box, Row, Button } from "@strapi/design-system";
import { EditIcon } from "@strapi/icons/EditIcon";
import { ConfigureIcon } from "@strapi/icons/ConfigureIcon";

export const SideActions = () => {
  return (
    <Row>
      <Box paddingRight={3}>
        <Button variant="secondary" leftIcon={<EditIcon />}>
          Edit the model
        </Button>
      </Box>

      <Button variant="secondary" leftIcon={<ConfigureIcon />}>
        Configure the view
      </Button>
    </Row>
  );
};
