import type { ComponentProps, CSSProperties, FormEvent } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Button as LegacyButton,
  Combobox,
  ComboboxOption,
  DatePicker,
  Dialog,
  Field,
  Flex,
  IconButton,
  Modal,
  Popover,
  SingleSelect,
  SingleSelectOption,
  Textarea,
  TextInput,
  Tooltip,
  Typography,
} from '@strapi/design-system';
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
import { Trash } from '@strapi/icons';
import { fn } from 'storybook/test';

type DrawerArgs = ComponentProps<typeof Drawer>;
type SwipeDirection = NonNullable<DrawerArgs['swipeDirection']>;

const SWIPE_DIRECTIONS = ['up', 'down', 'left', 'right'] satisfies SwipeDirection[];

const FRUITS = [
  { name: 'Apple', value: 'apple' },
  { name: 'Banana', value: 'banana' },
  { name: 'Kiwi', value: 'kiwi' },
  { name: 'Mango', value: 'mango' },
  { name: 'Orange', value: 'orange' },
];

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
            <SingleSelect placeholder="Pick a release">
              <SingleSelectOption value="spring">Spring launch</SingleSelectOption>
              <SingleSelectOption value="summer">Summer sale</SingleSelectOption>
            </SingleSelect>
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

export const WithLegacyComponents = {
  args: { swipeDirection: 'right' },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Legacy components</DrawerTitle>
          <DrawerDescription>Components of the old system inside the Drawer.</DrawerDescription>
        </DrawerHeader>
        <div style={BODY_STYLE}>
          <Field.Root name="name">
            <Field.Label>Name</Field.Label>
            <TextInput defaultValue="Select this text with the mouse" />
          </Field.Root>
          <Field.Root name="fruit">
            <Field.Label>Fruit</Field.Label>
            <SingleSelect placeholder="Pick a fruit">
              {FRUITS.map(({ name, value }) => (
                <SingleSelectOption key={value} value={value}>
                  {name}
                </SingleSelectOption>
              ))}
            </SingleSelect>
          </Field.Root>
          <Field.Root name="other-fruit">
            <Field.Label>Other fruit</Field.Label>
            <Combobox placeholder="Search a fruit">
              {FRUITS.map(({ name, value }) => (
                <ComboboxOption key={value} value={value}>
                  {name}
                </ComboboxOption>
              ))}
            </Combobox>
          </Field.Root>
          <Field.Root name="date">
            <Field.Label>Date</Field.Label>
            <DatePicker />
          </Field.Root>
          <Flex gap={2}>
            <Popover.Root>
              <Popover.Trigger>
                <LegacyButton variant="secondary">Popover</LegacyButton>
              </Popover.Trigger>
              <Popover.Content>
                <Box padding={4}>
                  <Typography fontWeight="bold" marginBottom={2} tag="legend">
                    Fill in your details and win a prize!
                  </Typography>
                  <Flex
                    tag="form"
                    direction="column"
                    alignItems="stretch"
                    gap={4}
                    onSubmit={(event: FormEvent) => event.preventDefault()}
                  >
                    <Field.Root name="popover-name">
                      <Field.Label>Name</Field.Label>
                      <Field.Input />
                    </Field.Root>
                    <Field.Root name="popover-email">
                      <Field.Label>Email</Field.Label>
                      <Field.Input type="email" />
                    </Field.Root>
                    <LegacyButton justifyContent="center" type="submit" variant="secondary">
                      Submit
                    </LegacyButton>
                  </Flex>
                </Box>
              </Popover.Content>
            </Popover.Root>
            <Tooltip label="Delete the entry">
              <IconButton withTooltip={false} label="Delete">
                <Trash />
              </IconButton>
            </Tooltip>
            <Modal.Root>
              <Modal.Trigger>
                <LegacyButton variant="secondary">Modal</LegacyButton>
              </Modal.Trigger>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Legacy modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Field.Root name="modal-name">
                    <Field.Label>Modal field</Field.Label>
                    <TextInput />
                  </Field.Root>
                </Modal.Body>
                <Modal.Footer>
                  <Modal.Close>
                    <LegacyButton variant="tertiary">Close modal</LegacyButton>
                  </Modal.Close>
                </Modal.Footer>
              </Modal.Content>
            </Modal.Root>
            <Dialog.Root>
              <Dialog.Trigger>
                <LegacyButton variant="secondary">Dialog</LegacyButton>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>Legacy dialog</Dialog.Header>
                <Dialog.Body>Do you confirm?</Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Cancel>
                    <LegacyButton variant="tertiary">Close dialog</LegacyButton>
                  </Dialog.Cancel>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
          {Array.from({ length: 12 }, (_, index) => (
            <Typography key={index} tag="p">
              Long content, part {index + 1}. The body of the Drawer scrolls, and the page behind it does not.
            </Typography>
          ))}
        </div>
        <DrawerFooter style={FOOTER_STYLE}>
          <DrawerClose render={<LegacyButton variant="tertiary" />}>Cancel</DrawerClose>
          <LegacyButton>Save</LegacyButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  name: 'with legacy components',
} satisfies Story;
