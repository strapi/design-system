import { useEffect, useState } from "react";
import { Box } from "@strapi/design-system/Box";
import { H1, Text } from "@strapi/design-system/Text";
import { Stack } from "@strapi/design-system/Stack";
import { Link } from "@strapi/design-system/Link";
import { Grid } from "@strapi/design-system/Grid";
import { Row } from "@strapi/design-system/Row";
import { Button } from "@strapi/design-system/Button";
import { Loader } from "@strapi/design-system/Loader";
import BackIcon from "@strapi/icons/BackIcon";
import CheckIcon from "@strapi/icons/CheckIcon";
import { EditForm } from "./EditView/EditForm";
import { Information } from "./EditView/Information";
import { Reviews } from "./EditView/Reviews";
import { SideActions } from "./EditView/SideAction";
import { AdminLayout } from "../layouts/AdminLayout";
import { GenericInput } from "../shared/GenericInput/GenericInput";

export const EditViewPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box background="neutral100" paddingTop={6} paddingBottom={6}>
        <div style={{ textAlign: "center" }}>
          <Loader>Loading strapi bro</Loader>
        </div>
      </Box>
    );
  }

  return (
    <AdminLayout>
      <GenericInput />
      <Box>
        <Stack size={2}>
          <Link to="/" leftIcon={<BackIcon />}>
            Back
          </Link>
          <Row justifyContent="space-between">
            <H1 id="main-title">Create a new entry</H1>
            <Button leftIcon={<CheckIcon />}>Save</Button>
          </Row>
          <Text textColor="neutral700">API ID: Restaurant</Text>
        </Stack>

        <Grid
          paddingTop={10}
          areas={["form form form sideinfo"]}
          cols="3fr 1fr"
          gap={6}
        >
          <Box
            area="form"
            hasRadius
            background="neutral0"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={8}
            paddingRight={8}
            shadow="filterShadow"
          >
            <EditForm />
          </Box>

          <Box area="sideinfo" as="aside">
            <Stack size={3}>
              <Information />
              <Reviews />
              <SideActions />
            </Stack>
          </Box>
        </Grid>
      </Box>
    </AdminLayout>
  );
};
