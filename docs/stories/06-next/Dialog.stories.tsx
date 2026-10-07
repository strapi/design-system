import { Meta, StoryObj } from '@storybook/react-vite';

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const FIELD_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  fontSize: '1.2rem',
  fontWeight: 600,
} as const;

const INPUT_STYLE = {
  padding: '0.8rem 1.6rem',
  border: '1px solid var(--neutral-200)',
  borderRadius: '0.4rem',
  fontSize: '1.4rem',
} as const;

interface ModalArgs {
  title: string;
  closeLabel: string;
  paragraphs: number;
  defaultOpen?: boolean;
}

const Modal = ({ title, closeLabel, paragraphs, defaultOpen }: ModalArgs) => (
  <Dialog defaultOpen={defaultOpen}>
    <DialogTrigger render={<Button />}>Edit entry</DialogTrigger>
    <DialogContent>
      <DialogHeader closeLabel={closeLabel}>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          <label style={FIELD_STYLE}>
            Name
            <input style={INPUT_STYLE} defaultValue="Strapi" />
          </label>
          {Array.from({ length: paragraphs }, (_, index) => (
            <p key={index} style={{ fontSize: '1.4rem' }}>
              Content types define the structure of your data. Each field you add to a content type becomes an input in
              the Content Manager and an attribute in the API.
            </p>
          ))}
        </div>
      </DialogBody>
      <DialogFooter>
        <DialogClose render={<Button variant="tertiary" />}>Cancel</DialogClose>
        <Button>Finish</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const meta: Meta<ModalArgs> = {
  title: 'Next/Dialog',
  component: Modal,
  args: {
    title: 'Edit the entry',
    closeLabel: 'Close modal',
    paragraphs: 2,
  },
  argTypes: {
    title: { description: 'The text of `DialogTitle`, the accessible name of the dialog.' },
    closeLabel: { description: 'The accessible name of the close button in `DialogHeader`.' },
    paragraphs: { description: 'Story only: the amount of text in the body, to show it scroll.' },
  },
  render: (args) => <Modal {...args} />,
};

export default meta;

type Story = StoryObj<ModalArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const LongContent = {
  args: { paragraphs: 30 },
  name: 'long content',
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
