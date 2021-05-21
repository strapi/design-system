import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Row } from "@strapi/design-system/Row";
import { Button } from "@strapi/design-system/Button";
import EditIcon from "@strapi/icons/EditIcon";
import ConfigureIcon from "@strapi/icons/ConfigureIcon";

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
