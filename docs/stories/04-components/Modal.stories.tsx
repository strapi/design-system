import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Button,
  Checkbox,
  CheckboxProps,
  DatePicker,
  Field,
  Flex,
  Grid,
  Modal,
  TimePicker,
} from '@strapi/design-system';
import { outdent } from 'outdent';

import { P } from '../../components/Typography';

interface ModalArgs
  extends Modal.Props,
    Pick<
      Modal.ContentProps,
      'onOpenAutoFocus' | 'onCloseAutoFocus' | 'onEscapeKeyDown' | 'onPointerDownOutside' | 'onInteractOutside'
    > {}

const meta: Meta<ModalArgs> = {
  title: 'Components/Modal',
  component: Modal.Root,
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
          <Modal.Root>
            <Modal.Trigger>
              <Button>Edit Release</Button>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Add to release</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Field.Root name="name" required>
                  <Field.Label>Name</Field.Label>
                  <Field.Input />
                </Field.Root>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close>
                  <Button variant="tertiary">Cancel</Button>
                </Modal.Close>
                <Button>Confirm</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Root>
        `,
      },
    },
    chromatic: { disableSnapshot: false },
  },
  args: {
    defaultOpen: false,
    onOpenChange: fn(),
    onOpenAutoFocus: fn(),
    onCloseAutoFocus: fn(),
    onEscapeKeyDown: fn(),
    onPointerDownOutside: fn(),
    onInteractOutside: fn(),
  },
  render: ({
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    ...args
  }) => {
    const [scheduleRelease, setScheduleRelease] = React.useState<CheckboxProps['checked']>(true);

    return (
      <Modal.Root {...args}>
        <Modal.Trigger>
          <Button>Edit Release</Button>
        </Modal.Trigger>
        <Modal.Content
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onInteractOutside={onInteractOutside}
        >
          <Modal.Header>
            <Modal.Title>Add to release</Modal.Title>
          </Modal.Header>
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <Modal.Body>
              <Grid.Root gridCols={2} gap={6}>
                <Grid.Item col={2}>
                  <Field.Root name="name" required>
                    <Field.Label>Name</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </Grid.Item>
                <Grid.Item col={2}>
                  <Checkbox checked={scheduleRelease} onCheckedChange={setScheduleRelease} name="schedule" value="true">
                    Schedule release
                  </Checkbox>
                </Grid.Item>
                {scheduleRelease ? (
                  <>
                    <Grid.Item col={1}>
                      <Field.Root name="date" required>
                        <Field.Label>Date</Field.Label>
                        <DatePicker />
                      </Field.Root>
                    </Grid.Item>
                    <Grid.Item col={1}>
                      <Field.Root name="time" required>
                        <Field.Label>time</Field.Label>
                        <TimePicker />
                      </Field.Root>
                    </Grid.Item>
                  </>
                ) : null}
              </Grid.Root>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>
                <Button variant="tertiary">Cancel</Button>
              </Modal.Close>
              <Button type="submit">Confirm</Button>
            </Modal.Footer>
          </form>
        </Modal.Content>
      </Modal.Root>
    );
  },
};

export default meta;

type Story = StoryObj<ModalArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const DefaultOpen = {
  args: {
    defaultOpen: true,
  },
  name: 'default open',
} satisfies Story;

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const CloseOnSuccess = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      source: {
        code: outdent`
          const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

          export default () => {
            const [open, setOpen] = React.useState(false);

            return (
              <Modal.Root open={open} onOpenChange={setOpen}>
                <Modal.Trigger>
                  <Button>Edit Release</Button>
                </Modal.Trigger>
                <Modal.Content>
                  <Modal.Header>
                    <Modal.Title>Add to release</Modal.Title>
                  </Modal.Header>
                  <form
                    onSubmit={(event) => {
                      wait().then(() => {
                        setOpen(false);
                      });
                      event.preventDefault();
                    }}
                  >
                    <Modal.Body>{/* inputs */}</Modal.Body>
                    <Modal.Footer>
                      <Button type="submit">Confirm</Button>
                    </Modal.Footer>
                  </form>
                </Modal.Content>
              </Modal.Root>
            );
          };
        `,
      },
    },
  },
  render: ({
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    ...args
  }) => {
    const [open, setOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [scheduleRelease, setScheduleRelease] = React.useState<CheckboxProps['checked']>(true);

    return (
      <Modal.Root {...args} open={open} onOpenChange={setOpen}>
        <Modal.Trigger>
          <Button>Edit Release</Button>
        </Modal.Trigger>
        <Modal.Content
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onInteractOutside={onInteractOutside}
        >
          <Modal.Header>
            <Modal.Title>Add to release</Modal.Title>
          </Modal.Header>
          <form
            onSubmit={(event) => {
              setIsSubmitting(true);
              wait().then(() => {
                setOpen(false);
                setIsSubmitting(false);
              });
              event.preventDefault();
            }}
          >
            <Modal.Body>
              <Grid.Root gridCols={2} gap={6}>
                <Grid.Item col={2}>
                  <Field.Root name="name" required>
                    <Field.Label>Name</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </Grid.Item>
                <Grid.Item col={2}>
                  <Checkbox checked={scheduleRelease} onCheckedChange={setScheduleRelease} name="schedule" value="true">
                    Schedule release
                  </Checkbox>
                </Grid.Item>
                {scheduleRelease ? (
                  <>
                    <Grid.Item col={1}>
                      <Field.Root name="date" required>
                        <Field.Label>Date</Field.Label>
                        <DatePicker />
                      </Field.Root>
                    </Grid.Item>
                    <Grid.Item col={1}>
                      <Field.Root name="time" required>
                        <Field.Label>time</Field.Label>
                        <TimePicker />
                      </Field.Root>
                    </Grid.Item>
                  </>
                ) : null}
              </Grid.Root>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>
                <Button variant="tertiary">Cancel</Button>
              </Modal.Close>
              <Button loading={isSubmitting} type="submit">
                Confirm
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Content>
      </Modal.Root>
    );
  },
  name: 'close on success',
} satisfies Story;

const DATA = [
  'In the winter of 2020, on a sunny and crisp morning I bumped into an old acquaintance of mine at the tree lined banks of the river Thames. Smiling at the world comfortably with hands in pockets, the man seeming without a care in the world.',
  "On noticing me he exclaimed, and led his friend placing an arm over the man's shoulder over to me, already singing my praises and opening his greetings with a well meaning and personally insightful question.",
  'The man, of course, was Ted Lasso. A Kansas-born American football coach turned UK football coaching phenomenon.',
  "Few of my interviewees would have such a reaction seeing the outside of their working lives, knowing that I could ask questions that would make them uncomfortable or that they wouldn't know how to answer. As well as knowing that what they chose to share with me was in confidence but could be shared with all of those that read my articles. However for Ted that personally(?) never made an impact. For Ted, everyone that comes into his life is a personal friend, no matter the circumstances of meeting. This attitude, it becomes clear, and I truly hope you will understand the power of its effect by the time you finish reading this book, contributed not only to Ted's personal life but the sporting capabilities of the AFC's Richmond team.",
  "When I first met Ted the situation(?) was different. Humiliation would best describe Ted's first...shockwaves through the community as they knew that they would be modifying as a result when they unabashedly...for the effect of that football...No one could have guessed what that new impact would eventually be.",
];

export const Scrolling = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: ({
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    ...args
  }) => {
    return (
      <Modal.Root {...args}>
        <Modal.Trigger>
          <Button>More info</Button>
        </Modal.Trigger>
        <Modal.Content
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onInteractOutside={onInteractOutside}
        >
          <Modal.Header>
            <Modal.Title>An excerpt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {DATA.map((datum, index) => (
              <P key={index}>{datum}</P>
            ))}
          </Modal.Body>
          <Modal.Footer justifyContent="flex-end">
            <Modal.Close>
              <Button>Confirm</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    );
  },
  name: 'scrolling',
} satisfies Story;
