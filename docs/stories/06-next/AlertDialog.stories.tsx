import { Meta, StoryObj } from '@storybook/react-vite';
import { WarningCircle } from '@strapi/icons';
import { fn } from 'storybook/test';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

interface ConfirmArgs {
  title: string;
  body: string;
  onConfirm: () => void;
  defaultOpen?: boolean;
}

const Confirm = ({ title, body, onConfirm, defaultOpen }: ConfirmArgs) => (
  <AlertDialog defaultOpen={defaultOpen}>
    <AlertDialogTrigger render={<Button variant="danger-light" />}>Delete entry</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogBody icon={<WarningCircle fill="danger600" />}>{body}</AlertDialogBody>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="danger-light" onClick={onConfirm}>
          Yes, delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const meta: Meta<ConfirmArgs> = {
  title: 'Next/AlertDialog',
  component: Confirm,
  args: {
    title: 'Confirmation',
    body: 'Are you sure you want to delete this entry?',
    onConfirm: fn(),
  },
  argTypes: {
    title: { description: 'The text of `AlertDialogTitle`, the accessible name of the dialog.' },
    body: {
      description:
        'The text of `AlertDialogBody`. A string becomes the accessible description, under the optional `icon`.',
    },
    onConfirm: { description: 'The `onClick` of `AlertDialogAction`. The dialog closes after it.' },
  },
  render: (args) => <Confirm {...args} />,
};

export default meta;

type Story = StoryObj<ConfirmArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const CustomBody = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="tertiary" />}>Publish</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish 3 entries?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p style={{ fontSize: '1.4rem', textAlign: 'center' }}>
            The entries become public. You can unpublish them later from the list view.
          </p>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: { controls: { disable: true } },
  name: 'custom body',
} satisfies Story;

/**
 * Open on load, for the visual tests. The docs page does not render it, because an open dialog takes the focus.
 */
export const Open = {
  args: { defaultOpen: true },
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
    layout: 'fullscreen',
  },
  name: 'open',
} satisfies Story;
