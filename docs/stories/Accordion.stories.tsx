import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
  Typography,
  TextButton,
} from '@strapi/design-system';
import { Plus } from '@strapi/icons';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const Template: Story = {
  args: {
    expanded: false,
    error: '',
    size: 'S',
  },
  render: ({ ...args }) => {
    const [{ expanded }, updateArgs] = useArgs();

    return (
      <Accordion {...args} expanded={expanded} onToggle={() => updateArgs({ expanded: !expanded })}>
        <AccordionToggle title="User information" description="Your personal information" />
        <AccordionContent>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Typography>
        </AccordionContent>
      </Accordion>
    );
  },
};

export const Base = {
  ...Template,
  name: 'basic',
} satisfies Story;

export const WithAction = {
  ...Template,
  name: 'with action',
} satisfies Story;

export const WithIcon = {
  ...Template,
  name: 'with icon',
} satisfies Story;

export const Group = {
  args: {
    error: '',
    label: 'Users Information',
  },
  render: ({ ...args }) => {
    const [expandedID, setExpandedID] = React.useState<string | null>(null);

    const handleToggle = (id: string) => () => {
      setExpandedID((s) => (s === id ? null : id));
    };

    return (
      <AccordionGroup
        footer={
          <TextButton
            justifyContent="center"
            width="100%"
            height="48px"
            disabled
            startIcon={<Plus />}
            background="neutral150"
          >
            Add an entry
          </TextButton>
        }
        {...args}
      >
        <Accordion expanded={expandedID === 'acc-1'} onToggle={handleToggle('acc-1')} id="acc-1" size="S">
          <AccordionToggle title="Ted Lasso" togglePosition="left" />
          <AccordionContent>
            <Typography>My name is Ted Lasso</Typography>
          </AccordionContent>
        </Accordion>
        <Accordion expanded={expandedID === 'acc-2'} onToggle={handleToggle('acc-2')} id="acc-2" size="S">
          <AccordionToggle title="Coach Beard" togglePosition="left" />
          <AccordionContent>
            <Typography>My name is Coach.</Typography>
          </AccordionContent>
        </Accordion>
        <Accordion expanded={expandedID === 'acc-3'} onToggle={handleToggle('acc-3')} id="acc-3" size="S">
          <AccordionToggle title="Jamie Tart" togglePosition="left" />
          <AccordionContent>
            <Typography>My name is Jamie Tart</Typography>
          </AccordionContent>
        </Accordion>
        <Accordion expanded={expandedID === 'acc-4'} onToggle={handleToggle('acc-4')} id="acc-4" size="S">
          <AccordionToggle title="Nate" togglePosition="left" />
          <AccordionContent>
            <Typography>My name is Nate</Typography>
          </AccordionContent>
        </Accordion>
      </AccordionGroup>
    );
  },

  name: 'group',
} satisfies StoryObj<typeof AccordionGroup>;
