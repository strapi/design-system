import React from "react";
import {
  Box,
  Button,
  HeaderLayout,
  OneBlockLayout,
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
  Avatar,
  IconButton,
  Row,
  Searchbar,
  SearchForm,
} from "@strapi/design-system";
import EditIcon from "@strapi/icons/EditIcon";
import DeleteIcon from "@strapi/icons/DeleteIcon";
import AddIcon from "@strapi/icons/AddIcon";
import { Switch, Route } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { SettingsNav } from "../shared/SettingsNav";

const SettingsPage = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
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
        <OneBlockLayout
          startActions={
            <SearchForm>
              <Searchbar
                name="searchbar"
                onClear={() => {}}
                value={""}
                onChange={(e) => {}}
                clearLabel="Clearing the plugin search"
                placeholder="e.g: search for content"
              >
                Searching for a plugin
              </Searchbar>
            </SearchForm>
          }
          header={
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
          }
        >
          <Switch>
            <Route path="/settings/application">
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
                      <TableLabel>Description</TableLabel>
                    </Th>
                    <Th>
                      <TableLabel>Categories</TableLabel>
                    </Th>
                    <Th>
                      <TableLabel>Contact</TableLabel>
                    </Th>
                    <Th>More</Th>
                    <Th>More</Th>
                    <Th>More</Th>
                    <Th>
                      <VisuallyHidden>Actions</VisuallyHidden>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {entries.map((entry) => (
                    <Tr key={entry.id}>
                      <Td>
                        <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                      </Td>
                      <Td>
                        <Text textColor="neutral800">{entry.id}</Text>
                      </Td>
                      <Td>
                        <Avatar src={entry.cover} alt={entry.contact} />
                      </Td>
                      <Td>
                        <Text textColor="neutral800">{entry.description}</Text>
                      </Td>
                      <Td>
                        <Text textColor="neutral800">{entry.category}</Text>
                      </Td>
                      <Td>
                        <Text textColor="neutral800">{entry.contact}</Text>
                      </Td>
                      <Td>
                        <Text textColor="neutral800">{entry.description}</Text>
                      </Td>
                      <Td>
                        <Text textColor="neutral800">{entry.description}</Text>
                      </Td>
                      <Td>
                        <Text textColor="neutral800">{entry.description}</Text>
                      </Td>
                      <Td>
                        <Row>
                          <IconButton
                            onClick={() => console.log("edit")}
                            label="Edit"
                            noBorder
                            icon={<EditIcon />}
                          />
                          <Box paddingLeft={1}>
                            <IconButton
                              onClick={() => console.log("edit")}
                              label="Delete"
                              noBorder
                              icon={<DeleteIcon />}
                            />
                          </Box>
                        </Row>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Route>
            <Route path="">
              <Box padding={6}>TODO</Box>
            </Route>
          </Switch>
        </OneBlockLayout>
      </Main>
    </AppLayout>
  );
};

export default SettingsPage;
