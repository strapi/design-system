import { Meta, StoryObj } from '@storybook/react-vite';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbMenu,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenuItem,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Breadcrumb> = {
  title: 'Next/Breadcrumbs',
  component: Breadcrumb,
  args: {
    'aria-label': 'Folder navigation',
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'The accessible name of the navigation landmark (the legacy `label` prop).',
      table: { defaultValue: { summary: 'breadcrumb' } },
    },
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Media Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage current={false}>Animals</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Cats</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Base = {
  name: 'base',
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
} satisfies Story;

export const WithMenu = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Media Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbMenu aria-label="See more ascendants folders" label="...">
            <DropdownMenuItem>Animals</DropdownMenuItem>
            <DropdownMenuItem>Mammals</DropdownMenuItem>
          </BreadcrumbMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Cats</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'with menu',
} satisfies Story;
