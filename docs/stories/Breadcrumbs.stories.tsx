import { Meta, StoryObj } from '@storybook/react';
import { Flex, Breadcrumbs, Crumb, CrumbLink, CrumbSimpleMenu, MenuItem } from '@strapi/design-system';
import { CollectionType } from '@strapi/icons';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Design System/Components/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Base = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={3}>
      <Breadcrumbs label="Folder navigatation" as="nav">
        <CrumbLink href="/">Media Library</CrumbLink>
        <Crumb isCurrent>Cats</Crumb>
      </Breadcrumbs>
    </Flex>
  ),

  name: 'base',
} satisfies Story;

export const WithMenu = {
  render: () => (
    <Flex gap={3}>
      <Breadcrumbs label="Folder navigatation" as="nav">
        <CrumbLink href="/">Media Library</CrumbLink>
        <CrumbSimpleMenu aria-label="See more ascendants folders" label="...">
          <MenuItem href="/">Home</MenuItem>
          <MenuItem href="/somewhere">Somewhere internal</MenuItem>
        </CrumbSimpleMenu>
        <Crumb isCurrent>Cats</Crumb>
      </Breadcrumbs>
    </Flex>
  ),

  name: 'with-menu',
} satisfies Story;

export const WithoutNagivation = {
  render: () => (
    <Flex gap={3}>
      <CollectionType />
      <Breadcrumbs label="Category model, name field">
        <Crumb>Category</Crumb>
        <Crumb isCurrent>Name</Crumb>
      </Breadcrumbs>
    </Flex>
  ),

  name: 'without-nagivation',
} satisfies Story;

export const SingleLink = {
  render: () => (
    <Flex gap={3}>
      <Breadcrumbs label="Category model">
        <Crumb>Category</Crumb>
      </Breadcrumbs>
    </Flex>
  ),

  name: 'single-link',
} satisfies Story;
