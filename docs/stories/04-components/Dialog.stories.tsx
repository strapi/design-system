import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, Dialog, Flex, Radio } from '@strapi/design-system';
import { WarningCircle } from '@strapi/icons';
import { outdent } from 'outdent';

interface DialogArgs
  extends Dialog.Props,
    Pick<Dialog.BodyProps, 'icon'>,
    Pick<Dialog.ContentProps, 'onOpenAutoFocus' | 'onCloseAutoFocus' | 'onEscapeKeyDown'> {}

const meta: Meta<DialogArgs> = {
  title: 'Components/Dialog',
  decorators: [
    (Story) => (
      <Flex width="100%" height="100%" justifyContent="center">
        <Story />
      </Flex>
    ),
  ],
  args: {
    icon: <WarningCircle fill="danger600" />,
    defaultOpen: false,
    onOpenChange: fn(),
    onOpenAutoFocus: fn(),
    onCloseAutoFocus: fn(),
    onEscapeKeyDown: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: outdent`
          <Dialog.Root>
            <Dialog.Trigger>
              <Button variant="danger">Delete</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>Confirmation</Dialog.Header>
              <Dialog.Body icon={<WarningCircle fill="danger600" />}>Are you sure you want to delete this?</Dialog.Body>
              <Dialog.Footer>
                <Dialog.Cancel>
                  <Button fullWidth variant="tertiary">
                    Cancel
                  </Button>
                </Dialog.Cancel>
                <Dialog.Action>
                  <Button fullWidth variant="danger-light">
                    Yes, delete
                  </Button>
                </Dialog.Action>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        `,
      },
    },
  },
  render: ({ icon, onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, ...args }) => {
    return (
      <Dialog.Root {...args}>
        <Dialog.Trigger>
          <Button variant="danger">Delete</Button>
        </Dialog.Trigger>
        <Dialog.Content
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
        >
          <Dialog.Header>Confirmation</Dialog.Header>
          <Dialog.Body icon={icon}>Are you sure you want to delete this?</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Cancel>
              <Button fullWidth variant="tertiary">
                Cancel
              </Button>
            </Dialog.Cancel>
            <Dialog.Action>
              <Button fullWidth variant="danger-light">
                Yes, delete
              </Button>
            </Dialog.Action>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
};

export default meta;

type Story = StoryObj<DialogArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const DefaultOpen = {
  args: {
    defaultOpen: true,
  },
  name: 'default open',
} satisfies Story;

export const Children = {
  name: 'children',
  render: ({ onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, ...args }) => {
    return (
      <Dialog.Root {...args}>
        <Dialog.Trigger>
          <Button variant="danger">Delete</Button>
        </Dialog.Trigger>
        <Dialog.Content
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
        >
          <Dialog.Header>Confirmation</Dialog.Header>
          <Dialog.Body>
            <Flex gap={6} direction="column" alignItems="stretch">
              <Flex gap={2} direction="column">
                <WarningCircle fill="danger600" width="24" height="24" />
                <Dialog.Description textAlign="center">
                  Are you sure you want to unpublish this? How would you like to handle your current draft?
                </Dialog.Description>
              </Flex>
              <Radio.Group defaultValue="keep">
                <Radio.Item value="keep">Unpublish and keep last draft</Radio.Item>
                <Radio.Item value="replace">Unpublish and replace last draft</Radio.Item>
              </Radio.Group>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Cancel>
              <Button fullWidth variant="tertiary">
                Cancel
              </Button>
            </Dialog.Cancel>
            <Dialog.Action>
              <Button fullWidth variant="danger-light">
                Yes, delete
              </Button>
            </Dialog.Action>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
} satisfies Story;
