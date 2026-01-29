import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Drawer, Field, Flex, Typography } from '@strapi/design-system';
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie odio dui. Cras egestas ultrices
              pulvinar. Cras in pellentesque neque. Vestibulum imperdiet ex vitae felis lobortis, sed facilisis ligula
              laoreet. Proin iaculis molestie felis. Curabitur ultrices turpis nec rutrum facilisis. Suspendisse in
              ligula in est euismod feugiat. Proin vestibulum eros massa, et accumsan justo interdum dictum. Vestibulum
              sed varius urna. Ut pellentesque fermentum sodales. Suspendisse venenatis eros vitae lorem rutrum tempus.
              Suspendisse diam erat, semper gravida finibus et, tincidunt a erat. Curabitur placerat imperdiet urna, sit
              amet aliquet lorem rutrum sit amet. Aliquam et molestie nisl. Quisque at nisl et eros sollicitudin blandit
              bibendum ac augue. Quisque nec facilisis tortor. Nulla ex urna, scelerisque ultricies leo eget, iaculis
              laoreet ipsum. Suspendisse potenti. Sed eget porttitor lectus. Nullam in ipsum vel enim facilisis gravida.
              Duis posuere porttitor erat eu maximus. Morbi viverra tempus ante. Phasellus gravida ligula vel elit
              lacinia, ut finibus urna interdum. In cursus rhoncus accumsan. Cras at mattis massa. Mauris tempor ipsum
              quam. Integer augue eros, accumsan in ante nec, tincidunt ultrices nisl. Integer ut enim enim. Vivamus
              posuere metus et nibh pharetra, at bibendum dolor porttitor. Fusce iaculis eleifend lectus, ut rutrum
              sapien auctor et. In vitae risus lacus. Quisque ex mauris, venenatis vel nisi in, dictum suscipit tortor.
              Aliquam non justo cursus, dictum libero eget, viverra velit. Sed velit nisi, rutrum ut tempor et, ornare
              sit amet risus. Mauris ornare eleifend justo et viverra. Morbi feugiat nulla vitae sodales auctor. Donec
              laoreet quam nibh, vel mattis ligula venenatis et. Ut vel tempor eros. Suspendisse at est scelerisque,
              rutrum mi non, congue enim. Ut laoreet feugiat ante non lobortis. Vivamus convallis libero condimentum
              nisl pellentesque, quis feugiat nunc suscipit. Maecenas laoreet dui nec nisi placerat tincidunt. Integer
              elementum, mauris eu suscipit rutrum, lectus sapien porttitor odio, a egestas velit nibh in eros.
              Vestibulum eu quam eu lorem bibendum maximus. Sed ac commodo sapien. Suspendisse congue lacus id finibus
              auctor. Cras eu placerat leo. Pellentesque ut elit bibendum, auctor massa eget, mollis lacus. In porttitor
              semper ante, sed gravida metus porta id. In scelerisque neque non laoreet faucibus. Aenean molestie
              pellentesque leo quis pharetra. Nam sit amet dictum lacus. Fusce eget condimentum justo. Integer lacus
              lectus, sagittis non ultrices sit amet, hendrerit ac mi. Quisque non laoreet erat. Mauris nec nulla erat.
              Suspendisse potenti.
            </Typography>
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
