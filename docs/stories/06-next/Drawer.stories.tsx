import type { ComponentProps, CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Field, Textarea, TextInput, Typography } from '@strapi/design-system';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@strapi/design-system/next';
import { fn } from 'storybook/test';

type DrawerArgs = ComponentProps<typeof Drawer>;
type SwipeDirection = NonNullable<DrawerArgs['swipeDirection']>;

const SWIPE_DIRECTIONS = ['up', 'down', 'left', 'right'] satisfies SwipeDirection[];

const BODY_STYLE = {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: '1.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
} satisfies CSSProperties;

const FOOTER_STYLE = { flexDirection: 'row', justifyContent: 'flex-end', paddingTop: '1.6rem' } satisfies CSSProperties;

const meta: Meta<DrawerArgs> = {
  title: 'Next/Drawer',
  component: Drawer,
  args: {
    defaultOpen: false,
    modal: true,
    onOpenChange: fn(),
    showSwipeHandle: false,
    swipeDirection: 'right',
  },
  argTypes: {
    defaultOpen: {
      description: 'If true, the Drawer is open on the first render.',
    },
    modal: {
      control: 'select',
      options: [true, false, 'trap-focus'],
      description:
        'If true, the Drawer shows an overlay, locks the page scroll and keeps the focus inside. With `trap-focus`, it keeps only the focus inside.',
      table: {
        type: { summary: "boolean | 'trap-focus'" },
        defaultValue: { summary: 'true' },
      },
    },
    showSwipeHandle: {
      description: 'If true, the Drawer shows a handle on the edge that the user can drag.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    swipeDirection: {
      control: 'select',
      options: SWIPE_DIRECTIONS,
      description:
        'The direction of the swipe that closes the Drawer. The Drawer opens from the opposite edge: `right` gives a panel on the right side.',
      table: {
        type: { summary: SWIPE_DIRECTIONS.map((direction) => `'${direction}'`).join(' | ') },
        defaultValue: { summary: 'down' },
      },
    },
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add to release</DrawerTitle>
          <DrawerDescription>Pick the release that gets this entry.</DrawerDescription>
        </DrawerHeader>
        <div style={BODY_STYLE}>
          <Typography>The body of the Drawer.</Typography>
        </div>
        <DrawerFooter style={FOOTER_STYLE}>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          <Button>Continue</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export default meta;

type Story = StoryObj<DrawerArgs>;

export const Right = {
  args: { swipeDirection: 'right' },
  name: 'right',
} satisfies Story;

export const Left = {
  args: { swipeDirection: 'left' },
  name: 'left',
} satisfies Story;

export const Bottom = {
  args: { swipeDirection: 'down', showSwipeHandle: true },
  name: 'bottom',
} satisfies Story;

export const Top = {
  args: { swipeDirection: 'up', showSwipeHandle: true },
  name: 'top',
} satisfies Story;

export const WithForm = {
  args: { swipeDirection: 'right' },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>Add to release</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add to release</DrawerTitle>
          <DrawerDescription>Pick the release that gets this entry.</DrawerDescription>
        </DrawerHeader>
        <form
          id="add-to-release"
          style={BODY_STYLE}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Field.Root name="release" required>
            <Field.Label>Release</Field.Label>
            <TextInput placeholder="Spring launch" />
          </Field.Root>
          <Field.Root name="note" hint="Only the editors see this note.">
            <Field.Label>Note</Field.Label>
            <Textarea />
            <Field.Hint />
          </Field.Root>
        </form>
        <DrawerFooter style={FOOTER_STYLE}>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          <Button type="submit" form="add-to-release">
            Continue
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  name: 'with form',
} satisfies Story;
