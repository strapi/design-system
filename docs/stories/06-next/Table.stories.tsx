import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Pencil, Plus, Trash } from '@strapi/icons';
import { fn } from 'storybook/test';

import {
  Avatar,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const ENTRIES = Array.from({ length: 5 }, (_, id) => ({
  id,
  cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
  description: 'Chez Léon is a human sized Parisian',
  category: 'French cuisine',
  contact: `Leon Lafrite ${id + 1}`,
  fallback: 'LL',
}));

const COL_COUNT = 7;
const ROW_COUNT = ENTRIES.length + 1;

const CONTAINER_STYLE = { padding: '3.2rem', background: 'var(--neutral-100)' };

interface ExampleTableProps extends Omit<TableProps, 'colCount' | 'rowCount'> {
  onEdit?: (contact: string) => void;
  onDelete?: (contact: string) => void;
}

const ExampleTable = ({ onEdit, onDelete, ...props }: ExampleTableProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const allSelected = selected.length === ENTRIES.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all entries"
              checked={someSelected ? 'indeterminate' : allSelected}
              onCheckedChange={(checked) => setSelected(checked ? ENTRIES.map(({ id }) => id) : [])}
            />
          </TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ENTRIES.map((entry) => (
          <TableRow key={entry.id} aria-selected={selected.includes(entry.id)}>
            <TableCell>
              <Checkbox
                aria-label={`Select ${entry.contact}`}
                checked={selected.includes(entry.id)}
                onCheckedChange={(checked) =>
                  setSelected((prev) => (checked ? [...prev, entry.id] : prev.filter((id) => id !== entry.id)))
                }
              />
            </TableCell>
            <TableCell>{entry.id}</TableCell>
            <TableCell>
              <Avatar src={entry.cover} alt={entry.contact} fallback={entry.fallback} />
            </TableCell>
            <TableCell>{entry.description}</TableCell>
            <TableCell>{entry.category}</TableCell>
            <TableCell>{entry.contact}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                <IconButton label={`Edit ${entry.contact}`} variant="ghost" onClick={() => onEdit?.(entry.contact)}>
                  <Pencil />
                </IconButton>
                <IconButton label={`Delete ${entry.contact}`} variant="ghost" onClick={() => onDelete?.(entry.contact)}>
                  <Trash />
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const meta: Meta<typeof Table> = {
  title: 'Next/Table',
  component: Table,
  argTypes: {
    colCount: {
      description: 'The number of columns. It sets `aria-colcount` and bounds the keyboard navigation.',
    },
    rowCount: {
      description: 'The number of rows, the header row included. It sets `aria-rowcount`.',
    },
    footer: {
      description: 'Content under the rows, inside the frame of the table, usually a `TableFooter`.',
      table: { type: { summary: 'ReactNode' } },
    },
    jumpStep: {
      description: 'How many rows PageUp and PageDown move the focus by.',
      table: { defaultValue: { summary: '3' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Base = {
  render: () => (
    <div style={CONTAINER_STYLE}>
      <ExampleTable
        onEdit={fn()}
        onDelete={fn()}
        footer={<TableFooter icon={<Plus />}>Add another field to this collection type</TableFooter>}
      />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'base',
} satisfies Story;

export const WithoutFooter = {
  render: () => (
    <div style={CONTAINER_STYLE}>
      <ExampleTable />
    </div>
  ),
  name: 'without footer',
} satisfies Story;

export const Overflowing = {
  render: () => (
    <div style={{ ...CONTAINER_STYLE, maxWidth: '64rem' }}>
      <ExampleTable />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'overflowing',
} satisfies Story;
