import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Drawer, Field, Flex } from '@strapi/design-system';
import { outdent } from 'outdent';

interface DrawerArgs
  extends Drawer.Props,
    Pick<Drawer.ContentProps, 'direction' | 'width' | 'height' | 'maxWidth' | 'maxHeight' | 'padding'>,
    Pick<Drawer.HeaderProps, 'hasToggle' | 'hasClose'> {
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
            <Drawer.Content direction="right">
              <Drawer.Header hasClose={hasClose} hasToggle={hasToggle}>
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
    direction: 'right',
    headerVisible: false,
    overlayVisible: true,
    hasClose: true,
    hasToggle: true,
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
  render: ({
    direction,
    width,
    height,
    maxWidth,
    maxHeight,
    padding,
    headerVisible,
    overlayVisible,
    hasClose,
    hasToggle,
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
          direction={direction}
          width={width}
          {...(height !== undefined && { height })}
          {...(maxWidth !== undefined && { maxWidth })}
          {...(maxHeight !== undefined && { maxHeight })}
          {...(padding !== undefined && { padding })}
        >
          <Drawer.Header hasClose={hasClose} hasToggle={hasToggle}>
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

export const DirectionRight = {
  args: {
    defaultOpen: true,
    direction: 'right',
  },
  name: 'direction right',
} satisfies Story;

export const DirectionLeft = {
  args: {
    defaultOpen: true,
    direction: 'left',
  },
  name: 'direction left',
} satisfies Story;

export const DirectionTop = {
  args: {
    defaultOpen: true,
    direction: 'top',
  },
  name: 'direction top',
} satisfies Story;

export const DirectionBottom = {
  args: {
    defaultOpen: true,
    direction: 'bottom',
  },
  name: 'direction bottom',
} satisfies Story;

export const HeaderVisible = {
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Drawer.Root headerVisible defaultOpen={false}>
            <Drawer.Content direction="bottom" width="100%" padding={0}>
              <Drawer.Header hasToggle={false}>
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
    direction: 'bottom',
    width: '100%',
    padding: 0,
  },
  name: 'header visible',
} satisfies Story;
