import React from "react";
import {
  Box,
  Button,
  HeaderLayout,
  ContentLayout,
  Layout,
  Main,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Text,
  TFooter,
  TableLabel,
  VisuallyHidden,
  BaseCheckbox,
  IconButton,
  Flex,
  Stack,
} from "@strapi/design-system";
import EditIcon from "@strapi/icons/Pencil";
import DeleteIcon from "@strapi/icons/Trash";
import AddIcon from "@strapi/icons/Plus";
import { Switch, Route } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { SettingsNav } from "../shared/SettingsNav";

const SettingsPage = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 4;
  const entry = {
    cover: "https://avatars.githubusercontent.com/u/3874873?v=4",
    description: "Chez Léon is a human sized Parisian",
    category: "French cuisine",
    contact: "Leon Lafrite",
  };

  const entries = [];

  for (let i = 0; i < 5; i++) {
    entries.push({ ...entry, id: i });
  }

  return (
    <AppLayout subNav={<SettingsNav />}>
      <Main labelledBy="header">
        <Layout>
          <Switch>
            <Route path="/settings/application">
              <HeaderLayout
                id="header"
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
              />
              <ContentLayout>
                <Table
                  colCount={COL_COUNT}
                  rowCount={ROW_COUNT}
                  footer={
                    <TFooter icon={<AddIcon />}>
                      Add another field to this collection type
                    </TFooter>
                  }
                >
                  <Thead>
                    <Tr>
                      <Th>
                        <BaseCheckbox aria-label="Select all entries" />
                      </Th>
                      <Th>
                        <TableLabel>ID</TableLabel>
                      </Th>
                      <Th>
                        <TableLabel>Cover</TableLabel>
                      </Th>
                      <Th>
                        <VisuallyHidden>Actions</VisuallyHidden>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {entries.map((entry) => (
                      <Tr key={entry.id}>
                        <Td>
                          <BaseCheckbox
                            aria-label={`Select ${entry.contact}`}
                          />
                        </Td>
                        <Td>
                          <Text textColor="neutral800">{entry.id}</Text>
                        </Td>
                        <Td>
                          <Text textColor="neutral800">{entry.id}</Text>
                        </Td>
                        <Td>
                          <Stack horizontal size={1}>
                            <IconButton
                              onClick={() => console.log("edit")}
                              label="Edit"
                              noBorder
                              icon={<EditIcon />}
                            />

                            <IconButton
                              onClick={() => console.log("edit")}
                              label="Delete"
                              noBorder
                              icon={<DeleteIcon />}
                            />
                          </Stack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </ContentLayout>
            </Route>
            <Route path="">
              <Box padding={6}>TODO</Box>
            </Route>
          </Switch>
        </Layout>
      </Main>
    </AppLayout>
  );
};

export default SettingsPage;
