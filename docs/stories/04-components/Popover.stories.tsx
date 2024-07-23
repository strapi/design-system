import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box, Button, Field, Popover, Typography } from '@strapi/design-system';
import { styled } from 'styled-components';

interface PopoverArgs extends Popover.Props, Popover.ContentProps {}

const meta: Meta<PopoverArgs> = {
  title: 'Components/Popover',
  component: Popover.Root,
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
  args: {
    onOpenChange: fn(),
    side: 'bottom',
    align: 'start',
    sideOffset: 4,
    alignOffset: 0,
    onEscapeKeyDown: fn(),
    onInteractOutside: fn(),
    onPointerDownOutside: fn(),
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: `
          <Popover.Root>
            <Popover.Trigger>
              <button>click me!</button>
            </Popover.Trigger>
            <Popover.Content>
              {/* Your content here! */}
            </Popover.Content>
          </Popover.Root>
        `,
      },
    },
  },
  render: ({
    side,
    align,
    sideOffset,
    alignOffset,
    onEscapeKeyDown,
    onInteractOutside,
    onPointerDownOutside,
    ...args
  }) => {
    return (
      <Popover.Root {...args}>
        <Popover.Trigger>
          <Button>Enter</Button>
        </Popover.Trigger>
        <Popover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          onEscapeKeyDown={onEscapeKeyDown}
          onInteractOutside={onInteractOutside}
          onPointerDownOutside={onPointerDownOutside}
        >
          <Box padding={4}>
            <Typography fontWeight="bold" marginBottom={2} tag="legend">
              Fill in your details and win a prize!
            </Typography>
            <Form action="#" onSubmit={(e) => e.preventDefault()}>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Field.Input />
              </Field.Root>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Field.Input type="email" />
              </Field.Root>
              <Button justifyContent="center" type="submit" variant="secondary">
                Submit
              </Button>
            </Form>
          </Box>
        </Popover.Content>
      </Popover.Root>
    );
  },
};

const Form = styled.form`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default meta;

type Story = StoryObj<PopoverArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Controlled = {
  name: 'controlled',
  args: {
    open: true,
  },
} satisfies Story;

export const ConstrainedSize = {
  name: 'constrained size',
  parameters: {
    docs: {
      source: {
        code: `
          <Popover.Root>
            <Popover.Trigger>
              <button>click me!</button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.ScrollArea>
                {/* Your content here! */}
              </Popover.ScrollArea>
            </Popover.Content>
          </Popover.Root>
        `,
      },
    },
  },
  render: ({
    side,
    align,
    sideOffset,
    alignOffset,
    onEscapeKeyDown,
    onInteractOutside,
    onPointerDownOutside,
    ...args
  }) => {
    return (
      <Popover.Root {...args}>
        <Popover.Trigger>
          <Button>Players</Button>
        </Popover.Trigger>
        <Popover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          onEscapeKeyDown={onEscapeKeyDown}
          onInteractOutside={onInteractOutside}
          onPointerDownOutside={onPointerDownOutside}
        >
          <Popover.ScrollArea>
            <Box tag="ul" padding={1}>
              {[
                "1 Tom O'Brien (GK)",
                '2 Arlo Dixon',
                '4 Tommy Winchester',
                '5 Isaac McAdoo (Captain)',
                '7 Kukoč',
                '8 Richard Montlaur',
                '9 Jamie Tartt',
                '12 Colin Hughes',
                '13 Jan Maas',
                '14 Dani Rojas',
                '16 Robbie Roberts',
                '17 Jeff Goodman',
                '18 Babatunde',
                '19 Declan Cockburn',
                '20 Paul Reynolds',
                '21 Moe Bumbercatch',
                '22 Martin De Maat (GK)',
                '24 Sam Obisanya (Vice Captain)',
                '28 Kyle McCracken',
                '28 Bhargava',
                '33 Anders Rosenfeldt',
              ].map((player) => (
                <Typography
                  key={player}
                  variant="omega"
                  tag="li"
                  paddingLeft={4}
                  paddingRight={4}
                  paddingTop={2}
                  paddingBottom={2}
                >
                  {player}
                </Typography>
              ))}
            </Box>
          </Popover.ScrollArea>
        </Popover.Content>
      </Popover.Root>
    );
  },
} satisfies Story;
