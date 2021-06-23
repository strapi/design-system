import { useEffect, useState } from "react";
import { Box } from "@strapi/design-system/Box";
import { H1, Text } from "@strapi/design-system/Text";
import { Stack } from "@strapi/design-system/Stack";
import { Link } from "@strapi/design-system/Link";
import { Row } from "@strapi/design-system/Row";
import { Button } from "@strapi/design-system/Button";
import { Loader } from "@strapi/design-system/Loader";
import BackIcon from "@strapi/icons/BackIcon";
import CheckIcon from "@strapi/icons/CheckIcon";
import { EditForm } from "../ContentManager/EditView/EditForm";
import { OneBlockLayout } from "../layouts/OneBlockLayout";

export const EditViewPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box
        background="neutral100"
        paddingTop={6}
        paddingBottom={6}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader>Loading strapi bro</Loader>
      </Box>
    );
  }

  return (
    <OneBlockLayout
      header={
        <Stack size={2}>
          <Link to="/" startIcon={<BackIcon />}>
            Back
          </Link>
          <Row justifyContent="space-between">
            <H1 id="main-title">Create a new entry</H1>
            <Button startIcon={<CheckIcon />}>Save</Button>
          </Row>
          <Text textColor="neutral700">API ID: Restaurant</Text>
        </Stack>
      }
    >
      <Box padding={6}>
        <EditForm />
      </Box>
    </OneBlockLayout>
  );
};
