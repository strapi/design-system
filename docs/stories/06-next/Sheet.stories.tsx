import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import {
  Button,
  Field,
  FieldLabel,
  Input,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetContentProps,
} from '@strapi/design-system/next';

type SheetArgs = Pick<SheetContentProps, 'side' | 'floating' | 'showOverlay' | 'showCloseButton' | 'closeLabel'>;

const meta: Meta<SheetArgs> = {
  title: 'Next/Sheet',
  args: {
    side: 'right',
    floating: false,
    showOverlay: true,
    showCloseButton: true,
    closeLabel: 'Close',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left', 'responsive'],
      description:
        'The edge the sheet slides in from. `responsive` is a bottom sheet below `medium`, a right rail above.',
      table: { defaultValue: { summary: 'right' } },
    },
    floating: { description: 'Renders the panel as a card with a gap to the edges of the screen.' },
    showOverlay: { description: 'Dims the page behind the sheet.' },
    showCloseButton: { description: 'Renders the close button in the top right corner.' },
    closeLabel: { description: 'The accessible name of the close button.' },
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Open the sheet</SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Asset details</SheetTitle>
          <SheetDescription>Edit the name and the alternative text.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Field name="name" className="flex flex-col gap-1">
            <FieldLabel>Name</FieldLabel>
            <Input defaultValue="cat.png" />
          </Field>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="tertiary" />}>Cancel</SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export default meta;

type Story = StoryObj<SheetArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Responsive = {
  args: { side: 'responsive', floating: true, showOverlay: false },
  render: (args) => (
    <Sheet modal={false} disablePointerDismissal>
      <SheetTrigger render={<Button variant="secondary" />}>Open the details</SheetTrigger>
      <SheetContent {...args} className="medium:w-120">
        <SheetHeader>
          <SheetTitle>Asset details</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <p className="m-0 text-sm text-neutral-600">
            A bottom sheet on small screens and a rail on the right from `medium` up. The page stays usable behind it,
            and an outside press does not close it.
          </p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
  name: 'responsive, non-modal',
} satisfies Story;
