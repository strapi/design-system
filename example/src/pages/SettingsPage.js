import React from "react";
import {
  Box,
  Button,
  HeaderLayout,
  OneBlockLayout,
} from "@strapi/design-system";
import EditIcon from "@strapi/icons/EditIcon";
import AddIcon from "@strapi/icons/AddIcon";
import { AppLayout } from "../layouts/AppLayout";
import { SettingsNav } from "../shared/SettingsNav";

const SettingsPage = () => {
  return (
    <AppLayout subNav={<SettingsNav />}>
      <OneBlockLayout
        header={
          <HeaderLayout
            primaryAction={
              <Button startIcon={<AddIcon />}>Add an entry</Button>
            }
            secondaryAction={
              <Button variant="tertiary" startIcon={<EditIcon />}>
                Edit
              </Button>
            }
            title="Some settings"
            subtitle="36 entries found"
            as="h2"
          />
        }
      >
        <Box padding={6}>Hello</Box>
      </OneBlockLayout>
    </AppLayout>
  );
};

export default SettingsPage;
