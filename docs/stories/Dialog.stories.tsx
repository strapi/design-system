import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Typography, Flex, Button, Dialog, DialogBody, DialogFooter } from '@strapi/design-system';
import { ExclamationMarkCircle, Trash } from '@strapi/icons';

const meta: Meta<typeof Dialog> = {
  title: 'Design System/Components/Dialog',
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Base = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <>
        <Button onClick={() => setIsVisible(true)}>Click me</Button>
        <Dialog onClose={() => setIsVisible(false)} title="Confirmation" isOpen={isVisible}>
          <DialogBody icon={<ExclamationMarkCircle />}>
            <Flex direction="column" alignItems="center" gap={2}>
              <Flex justifyContent="center">
                <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
              </Flex>
            </Flex>
          </DialogBody>
          <DialogFooter
            startAction={
              <Button onClick={() => setIsVisible(false)} variant="tertiary">
                Cancel
              </Button>
            }
            endAction={
              <Button variant="danger-light" startIcon={<Trash />}>
                Confirm
              </Button>
            }
          />
        </Dialog>
      </>
    );
  },

  name: 'base',
} satisfies Story;
