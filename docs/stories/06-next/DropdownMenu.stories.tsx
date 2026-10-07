import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, More, Pencil, Trash } from '@strapi/icons';
import { fn } from 'storybook/test';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  SimpleMenu,
  type SimpleMenuProps,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

type SimpleMenuArgs = Pick<SimpleMenuProps, 'label' | 'disabled' | 'side' | 'align' | 'onOpen' | 'onClose'>;

const meta: Meta<SimpleMenuArgs> = {
  title: 'Next/DropdownMenu',
  args: {
    label: 'Months',
    disabled: false,
    side: 'bottom',
    align: 'start',
    onOpen: fn(),
    onClose: fn(),
  },
  argTypes: {
    label: { description: 'The text of the trigger, or the accessible name of an icon-only trigger.' },
    disabled: { description: 'If true, the trigger cannot open the menu.' },
    side: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'The side of the trigger the menu opens on.',
      table: { defaultValue: { summary: 'bottom' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The alignment of the menu against the trigger.',
      table: { defaultValue: { summary: 'start' } },
    },
  },
  render: (args) => (
    <div style={{ minHeight: '24rem' }}>
      <SimpleMenu {...args}>
        <DropdownMenuItem onClick={fn()}>January</DropdownMenuItem>
        <DropdownMenuItem onClick={fn()}>February</DropdownMenuItem>
        <DropdownMenuItem onClick={fn()}>March</DropdownMenuItem>
        <DropdownMenuLinkItem href="https://strapi.io" isExternal>
          Strapi website
        </DropdownMenuLinkItem>
      </SimpleMenu>
    </div>
  ),
};

export default meta;

type Story = StoryObj<SimpleMenuArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

const FullMenu = ({ defaultOpen }: { defaultOpen?: boolean }) => (
  <DropdownMenu defaultOpen={defaultOpen} modal={!defaultOpen}>
    <DropdownMenuTrigger render={<Button variant="tertiary" />}>Actions</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Entry</DropdownMenuLabel>
      <DropdownMenuItem startIcon={<Pencil />} onClick={fn()}>
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem startIcon={<Bell />} endIcon={<Bell />} onClick={fn()}>
        Notify
      </DropdownMenuItem>
      <DropdownMenuItem disabled>Unpublish</DropdownMenuItem>
      <DropdownMenuLinkItem href="#settings">Settings</DropdownMenuLinkItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={fn()}>JSON</DropdownMenuItem>
          <DropdownMenuItem onClick={fn()}>CSV</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="danger" startIcon={<Trash />} onClick={fn()}>
        Delete
      </DropdownMenuItem>
      <DropdownMenuItem variant="danger" disabled>
        Delete all
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Parts = {
  render: () => (
    <div style={{ minHeight: '24rem' }}>
      <FullMenu />
    </div>
  ),
  parameters: { controls: { disable: true } },
  name: 'parts',
} satisfies Story;

export const IconTrigger = {
  args: { label: 'More actions' },
  render: (args) => (
    <div style={{ minHeight: '16rem' }}>
      <SimpleMenu {...args} icon={<More />}>
        <DropdownMenuItem onClick={fn()}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem variant="danger" onClick={fn()}>
          Delete
        </DropdownMenuItem>
      </SimpleMenu>
    </div>
  ),
  name: 'icon trigger',
} satisfies Story;

const PagedMenu = () => {
  const [months, setMonths] = React.useState(() => Array.from({ length: 10 }, (_, index) => index + 1));

  return (
    <SimpleMenu
      label="Load more on scroll"
      onReachEnd={() =>
        setMonths((previous) => [...previous, ...Array.from({ length: 10 }, (_, index) => previous.length + index + 1)])
      }
    >
      {months.map((month) => (
        <DropdownMenuItem key={month}>Item {month}</DropdownMenuItem>
      ))}
    </SimpleMenu>
  );
};

export const OnReachEnd = {
  render: () => (
    <div style={{ minHeight: '24rem' }}>
      <PagedMenu />
    </div>
  ),
  parameters: { controls: { disable: true } },
  name: 'on reach end',
} satisfies Story;

/**
 * Open on load, for the visual tests. The docs page does not render it, because an open menu takes the focus.
 */
export const Open = {
  render: () => (
    <div style={{ minHeight: '40rem' }}>
      <FullMenu defaultOpen />
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'open',
} satisfies Story;
