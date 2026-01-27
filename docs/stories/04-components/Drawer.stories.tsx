import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Drawer, Field, Flex } from '@strapi/design-system';
import { outdent } from 'outdent';
import { fn } from 'storybook/test';

interface DrawerArgs
  extends Drawer.Props,
    Pick<
      Drawer.ContentProps,
      | 'side'
      | 'width'
      | 'maxHeight'
      | 'onOpenAutoFocus'
      | 'onCloseAutoFocus'
      | 'onEscapeKeyDown'
      | 'onPointerDownOutside'
      | 'onInteractOutside'
    > {
  headerVisible?: boolean;
  overlayVisible?: boolean;
}

const meta: Meta<DrawerArgs> = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  decorators: [
    (Story) => (
      <Flex width="100%" height="100%" justifyContent="center">
        <Story />
      </Flex>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Drawer.Root>
            <Drawer.Trigger>
              <Button>Open drawer</Button>
            </Drawer.Trigger>
            <Drawer.Content side="right">
              <Drawer.Header>
                <Drawer.Title>Drawer title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>Drawer content goes here.</p>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close>
                  <Button variant="tertiary">Cancel</Button>
                </Drawer.Close>
                <Button>Confirm</Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        `,
      },
    },
    chromatic: { disableSnapshot: false },
  },
  args: {
    defaultOpen: false,
    side: 'right',
    headerVisible: false,
    overlayVisible: true,
    onOpenChange: fn(),
    onOpenAutoFocus: fn(),
    onCloseAutoFocus: fn(),
    onEscapeKeyDown: fn(),
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
  render: ({
    side,
    width,
    maxHeight,
    headerVisible,
    overlayVisible,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    ...args
  }) => {
    return (
      <Drawer.Root {...args} headerVisible={headerVisible} overlayVisible={overlayVisible}>
        {!headerVisible && (
          <Drawer.Trigger>
            <Button>Open drawer</Button>
          </Drawer.Trigger>
        )}
        <Drawer.Content
          side={side}
          width={width}
          maxHeight={maxHeight}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
        >
          <Drawer.Header>
            <Drawer.Title>Drawer title</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Field.Root name="example">
              <Field.Label>Example field</Field.Label>
              <Field.Input placeholder="Type something…" />
            </Field.Root>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close>
              <Button variant="tertiary">Cancel</Button>
            </Drawer.Close>
            <Button>Confirm</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    );
  },
};

export default meta;

type Story = StoryObj<DrawerArgs>;

export const Base = {
  args: {
    defaultOpen: false,
  },

  name: 'base',
} satisfies Story;

export const DefaultOpen = {
  args: {
    defaultOpen: true,
  },
  name: 'default open',
} satisfies Story;

export const SideRight = {
  args: {
    defaultOpen: true,
    side: 'right',
  },
  name: 'side right',
} satisfies Story;

export const SideLeft = {
  args: {
    defaultOpen: true,
    side: 'left',
  },
  name: 'side left',
} satisfies Story;

export const SideTop = {
  args: {
    defaultOpen: true,
    side: 'top',
  },
  name: 'side top',
} satisfies Story;

export const SideBottom = {
  args: {
    defaultOpen: true,
    side: 'bottom',
  },
  name: 'side bottom',
} satisfies Story;

export const HeaderVisible = {
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Drawer.Root headerVisible defaultOpen={false}>
            <Drawer.Content side="bottom">
              <Drawer.Header>
                <Drawer.Title>Drawer title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>Toggle to expand and see content + overlay.</p>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close>
                  <Button variant="tertiary">Cancel</Button>
                </Drawer.Close>
                <Button>Confirm</Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        `,
      },
    },
  },
  args: {
    defaultOpen: false,
    headerVisible: true,
    side: 'bottom',
  },
  name: 'header visible',
} satisfies Story;
