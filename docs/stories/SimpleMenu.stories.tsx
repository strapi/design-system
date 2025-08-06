import { Meta, StoryObj } from '@storybook/react';
import { IconButton, SimpleMenu, MenuItem, Menu } from '@strapi/design-system';
import { Bell, Check, WarningCircle } from '@strapi/icons';

const meta: Meta<typeof SimpleMenu> = {
  title: 'Design System/Components/SimpleMenu',
  component: SimpleMenu,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj<typeof SimpleMenu>;

export const Basic = {
  render: () => (
    <SimpleMenu label="Actions">
      <MenuItem startIcon={<Bell />} onSelect={() => console.log('opening')}>
        Open
      </MenuItem>
      <MenuItem endIcon={<Bell />} disabled onSelect={() => console.log('cloning')}>
        Disabled
      </MenuItem>
      <MenuItem onSelect={() => console.log('editing')}>Edit</MenuItem>
      <MenuItem startIcon={<Bell />} variant="danger" onSelect={() => console.log('delete')}>
        Delete
      </MenuItem>
    </SimpleMenu>
  ),

  name: 'basic',
} satisfies Story;

export const WithIcons = {
  render: () => (
    <SimpleMenu label="Notifications" tag={IconButton} icon={<Bell />}>
      <MenuItem onSelect={() => console.log('view notification')}>Your review has been requested!</MenuItem>
      <MenuItem onSelect={() => console.log('view notification')}>There was an error with your billing.</MenuItem>
    </SimpleMenu>
  ),

  name: 'with icons',
} satisfies Story;

export const WithLinks = {
  render: () => (
    <SimpleMenu label="Navigation">
      <MenuItem href="/" isLink>
        Home
      </MenuItem>
      <MenuItem href="/accounts" isLink>
        Accounts
      </MenuItem>
      <MenuItem href="https://strapi.io/" isExternal>
        Billing Provider
      </MenuItem>
    </SimpleMenu>
  ),

  name: 'with links',
} satisfies Story;

export const NestedMenu = {
  render: () => (
    <SimpleMenu label="Actions">
      <Menu.SubRoot>
        <Menu.SubTrigger>Add new component above</Menu.SubTrigger>
        <Menu.SubContent>
          <Menu.Label>Category 1</Menu.Label>
          <MenuItem onSelect={() => console.log('adding component 1')}>Component 1</MenuItem>
          <MenuItem onSelect={() => console.log('adding component 2')}>Component 2</MenuItem>
          <Menu.Separator />
          <Menu.Label>Category 2</Menu.Label>
          <MenuItem onSelect={() => console.log('adding component 3')}>Component 3</MenuItem>
        </Menu.SubContent>
      </Menu.SubRoot>
      <MenuItem color="danger600" onSelect={() => console.log('delete')}>
        Delete component
      </MenuItem>
    </SimpleMenu>
  ),

  name: 'nested menu',
} satisfies Story;
