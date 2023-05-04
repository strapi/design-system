import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { SimpleMenu, MenuItem, IconButton, Flex } from '@strapi/design-system';
import { CarretDown } from '@strapi/icons';

const meta: Meta<typeof SimpleMenu> = {
  title: 'Design System/Components/SimpleMenu',
  component: SimpleMenu,
};

export default meta;

type Story = StoryObj<typeof SimpleMenu>;

export const Base = {
  render: () => {
    const [val, setValue] = useState('January');

    return (
      <SimpleMenu id="label" label={val}>
        <MenuItem id="menuItem-January" onClick={() => setValue('January')}>
          January
        </MenuItem>
        <MenuItem id="menuItem-February" onClick={() => setValue('February')}>
          February
        </MenuItem>
      </SimpleMenu>
    );
  },

  name: 'base',
} satisfies Story;

export const WithLinks = {
  render: () => (
    <SimpleMenu label="Menu">
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/somewhere">Somewhere internal</MenuItem>
      <MenuItem href="https://strapi.io/" isExternal>
        Somewhere External
      </MenuItem>
    </SimpleMenu>
  ),

  name: 'with-links',
} satisfies Story;

export const WithIconbutton = {
  render: () => (
    <SimpleMenu label="Menu" as={IconButton} icon={<CarretDown />}>
      <MenuItem>Home</MenuItem>
      <MenuItem>Somewhere internal</MenuItem>
      <MenuItem href="https://strapi.io/" isExternal>
        Somewhere External
      </MenuItem>
    </SimpleMenu>
  ),

  name: 'with-iconbutton',
} satisfies Story;

export const Sizes = {
  render: () => (
    <Flex gap={4}>
      <SimpleMenu label="Small Menu" size="S" icon={<CarretDown />}>
        <MenuItem>Home</MenuItem>
        <MenuItem>Somewhere internal</MenuItem>
      </SimpleMenu>
      <SimpleMenu label="Medium Menu" icon={<CarretDown />}>
        <MenuItem>Home</MenuItem>
        <MenuItem>Somewhere internal</MenuItem>
      </SimpleMenu>
    </Flex>
  ),

  name: 'sizes',
} satisfies Story;

export const WithCustomLabel = {
  render: () => {
    const Label = (
      <>
        <span>2</span>special items
      </>
    );

    return (
      <SimpleMenu label={Label}>
        <MenuItem>Home</MenuItem>
        <MenuItem>Somewhere internal</MenuItem>
      </SimpleMenu>
    );
  },

  name: 'with-custom-label',
} satisfies Story;
