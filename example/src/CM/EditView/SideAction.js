import React from "react";
import { Box } from "@strapi/parts/Box";
import { Row } from "@strapi/parts/Row";
import { Button } from "@strapi/parts/Button";
import EditIcon from "@strapi/icons/EditIcon";
import ConfigureIcon from "@strapi/icons/ConfigureIcon";

export const SideActions = () => {
  return (
    <Row>
      <Box paddingRight={3}>
        <Button variant="secondary" startIcon={<EditIcon />}>
          Edit the model
        </Button>
      </Box>

      <Button variant="secondary" startIcon={<ConfigureIcon />}>
        Configure the view
      </Button>
    </Row>
  );
};
