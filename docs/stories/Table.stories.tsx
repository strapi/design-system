import { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Flex,
  VisuallyHidden,
  BaseCheckbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  Avatar,
  IconButton,
  TFooter,
} from '@strapi/design-system';
import { Pencil, Trash, CaretDown, Plus } from '@strapi/icons';

const meta: Meta<typeof Table> = {
  title: 'Design System/Components/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Base = {
  render: () => {
    const ROW_COUNT = 6;
    const COL_COUNT = 10;

    const entry = {
      cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
      description: 'Chez Léon is a human sized Parisian',
      category: 'French cuisine',
      contact: 'Leon Lafrite',
    };

    const entries: Array<{ id: number } & typeof entry> = [];

    for (let i = 0; i < 5; i++) {
      entries.push({
        ...entry,
        id: i,
      });
    }

    return (
      <Box padding={8} background="neutral100">
        <Table
          colCount={COL_COUNT}
          rowCount={ROW_COUNT}
          footer={<TFooter icon={<Plus />}>Add another field to this collection type</TFooter>}
        >
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Cover</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Description</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Categories</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Contact</Typography>
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
                  <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.id}</Typography>
                </Td>
                <Td>
                  <Avatar src={entry.cover} alt={entry.contact} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.description}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.category}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.contact}</Typography>
                </Td>
                <Td>
                  <Flex>
                    <a href="https://www.google.com" target="_blank" rel="noreferrer">
                      G
                    </a>
                    <IconButton onClick={() => console.log('edit')} label="Edit" borderWidth={0} icon={<Pencil />} />
                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => console.log('delete')}
                        label="Delete"
                        borderWidth={0}
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  },

  name: 'base',
} satisfies Story;

export const BaseWithoutFooter = {
  render: () => {
    const ROW_COUNT = 6;
    const COL_COUNT = 10;

    const entry = {
      cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
      description: 'Chez Léon is a human sized Parisian',
      category: 'French cuisine',
      contact: 'Leon Lafrite',
    };

    const entries: Array<{ id: number } & typeof entry> = [];

    for (let i = 0; i < 5; i++) {
      entries.push({
        ...entry,
        id: i,
      });
    }

    return (
      <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Cover</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Description</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Categories</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Contact</Typography>
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
                  <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.id}</Typography>
                </Td>
                <Td>
                  <Avatar src={entry.cover} alt={entry.contact} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.description}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.category}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.contact}</Typography>
                </Td>
                <Td>
                  <Flex>
                    <IconButton onClick={() => console.log('edit')} label="Edit" borderWidth={0} icon={<Pencil />} />
                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => console.log('delete')}
                        label="Delete"
                        borderWidth={0}
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  },

  name: 'base without footer',
} satisfies Story;

export const WithThActions = {
  render: () => {
    const ROW_COUNT = 6;
    const COL_COUNT = 10;

    const entry = {
      cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
      description: 'Chez Léon is a human sized Parisian',
      category: 'French cuisine',
      contact: 'Leon Lafrite',
    };

    const entries: Array<{ id: number } & typeof entry> = [];

    for (let i = 0; i < 5; i++) {
      entries.push({
        ...entry,
        id: i,
      });
    }

    return (
      <Box padding={8} background="neutral100">
        <Table
          colCount={COL_COUNT}
          rowCount={ROW_COUNT}
          footer={<TFooter icon={<Plus />}>Add another field to this collection type</TFooter>}
        >
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th action={<IconButton label="Sort on ID" icon={<CaretDown />} borderWidth={0} />}>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Cover</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Description</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Categories</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Contact</Typography>
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
                  <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.id}</Typography>
                </Td>
                <Td>
                  <Avatar src={entry.cover} alt={entry.contact} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.description}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.category}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.contact}</Typography>
                </Td>
                <Td>
                  <Flex>
                    <IconButton onClick={() => console.log('edit')} label="Edit" borderWidth={0} icon={<Pencil />} />
                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => console.log('delete')}
                        label="Delete"
                        borderWidth={0}
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  },

  name: 'with th actions',
} satisfies Story;
