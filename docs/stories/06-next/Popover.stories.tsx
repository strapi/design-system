import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@strapi/design-system/next';

const meta: Meta<typeof Popover> = {
  title: 'Next/Popover',
  component: Popover,
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open</Button>} />
      <PopoverContent align="start" style={{ maxWidth: '20rem' }}>
        <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>Schedule</p>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Anything can go in a popover — a form, a menu, a calendar.
        </p>
        <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <PopoverClose render={<Button variant="ghost">Close</Button>} />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Base = {
  name: 'base',
} satisfies Story;
