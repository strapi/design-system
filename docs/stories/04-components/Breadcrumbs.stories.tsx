import { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, Breadcrumbs, Crumb, CrumbLink, CrumbSimpleMenu, MenuItem } from '@strapi/design-system';
import { CollectionType } from '@strapi/icons/symbols';
import { outdent } from 'outdent';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Base = {
  render: () => (
    <Flex direction="column" alignItems="stretch" gap={3}>
      <Breadcrumbs label="Folder navigatation">
        <CrumbLink href="/">Media Library</CrumbLink>
        <Crumb isCurrent>Cats</Crumb>
      </Breadcrumbs>
    </Flex>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Breadcrumbs label="Folder navigatation">
          <CrumbLink href="/">Media Library</CrumbLink>
          <Crumb isCurrent>Cats</Crumb>
        </Breadcrumbs>
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const WithMenu = {
  render: () => (
    <Flex gap={3}>
      <Breadcrumbs label="Folder navigatation">
        <CrumbLink href="/">Media Library</CrumbLink>
        <CrumbSimpleMenu aria-label="See more ascendants folders" label="...">
          <MenuItem href="/">Home</MenuItem>
          <MenuItem href="/somewhere">Somewhere internal</MenuItem>
        </CrumbSimpleMenu>
        <Crumb isCurrent>Cats</Crumb>
      </Breadcrumbs>
    </Flex>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Breadcrumbs label="Folder navigatation">
          <CrumbLink href="/">Media Library</CrumbLink>
          <CrumbSimpleMenu aria-label="See more ascendants folders" label="...">
            <MenuItem href="/">Home</MenuItem>
            <MenuItem href="/somewhere">Somewhere internal</MenuItem>
          </CrumbSimpleMenu>
          <Crumb isCurrent>Cats</Crumb>
        </Breadcrumbs>
        `,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Breadcrumbs label="Category model, name field">
          <Crumb>Category</Crumb>
          <Crumb isCurrent>Name</Crumb>
        </Breadcrumbs>
        `,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Breadcrumbs label="Category model">
          <Crumb>Category</Crumb>
        </Breadcrumbs>
        `,
      },
    },
  },
  name: 'single-link',
} satisfies Story;
