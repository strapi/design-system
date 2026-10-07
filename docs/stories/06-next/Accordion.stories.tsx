import { Meta, StoryObj } from '@storybook/react-vite';
import { Pencil, Trash, User } from '@strapi/icons';

import {
  Accordion,
  AccordionActions,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const ITEMS = [
  { value: 'acc-01', label: 'User informations', description: 'Name, email and password' },
  { value: 'acc-02', label: 'Roles', description: 'What the user can do' },
  { value: 'acc-03', label: 'Notifications', description: 'Emails sent to the user' },
];

const CONTENT_STYLE = { padding: '1.6rem 2.4rem', fontSize: '1.4rem' };

const ActionButtons = () => (
  <AccordionActions>
    <button type="button" aria-label="Edit" style={{ display: 'flex', padding: '0.7rem', cursor: 'pointer' }}>
      <Pencil />
    </button>
    <button type="button" aria-label="Delete" style={{ display: 'flex', padding: '0.7rem', cursor: 'pointer' }}>
      <Trash />
    </button>
  </AccordionActions>
);

const meta: Meta<typeof Accordion> = {
  title: 'Next/Accordion',
  component: Accordion,
  args: {
    size: 'sm',
    disabled: false,
    multiple: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description:
        '`sm` draws a bordered box with lines between the items. `md` has bigger paddings and shows the trigger `description`.',
      table: { type: { summary: "'sm' | 'md'" }, defaultValue: { summary: 'sm' } },
    },
    disabled: {
      description: 'Disables every item.',
    },
    multiple: {
      description: 'Lets several items be open at the same time.',
    },
  },
  render: (args) => (
    <Accordion {...args}>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger description={item.description}>{item.label}</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={CONTENT_STYLE}>{`The content of ${item.label}.`}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Base = {
  name: 'base',
} satisfies Story;

export const SizesAndVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
      <Accordion defaultValue={['acc-01']}>
        {ITEMS.map((item, index) => (
          <AccordionItem key={item.value} value={item.value} disabled={index === 2}>
            <AccordionHeader variant={index === 1 ? 'secondary' : 'primary'}>
              <AccordionTrigger icon={User}>{item.label}</AccordionTrigger>
              <ActionButtons />
            </AccordionHeader>
            <AccordionContent>
              <div style={CONTENT_STYLE}>{`The content of ${item.label}.`}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Accordion size="md" defaultValue={['acc-01']}>
        {ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionHeader>
              <AccordionTrigger caretPosition="right" description={item.description}>
                {item.label}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <div style={CONTENT_STYLE}>{`The content of ${item.label}.`}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'sizes and variants',
} satisfies Story;
