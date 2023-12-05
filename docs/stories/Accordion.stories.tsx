import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
  KeyboardNavigable,
  Box,
  Flex,
  Typography,
  IconButton,
  TextButton,
  TextInput,
  Tooltip,
} from '@strapi/design-system';
import { Pencil, Information, Trash, User, Plus } from '@strapi/icons';

const meta: Meta<typeof Accordion> = {
  title: 'Design System/Components/Accordion',
  component: Accordion,
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Base = {
  render: () => {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <div>
        <Box padding={8} background="neutral100">
          <Accordion
            error="The component contain error(s)"
            expanded={expanded}
            onToggle={() => setExpanded((s) => !s)}
            id="acc-1"
            size="S"
          >
            <AccordionToggle title="User informations" />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
        <Box padding={8} background="neutral0">
          <Accordion expanded={expanded} onToggle={() => setExpanded((s) => !s)} id="acc-2" variant="secondary">
            <AccordionToggle
              title="User informations 2"
              description="The following contains information about the current user 2"
              action={<IconButton onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />}
            />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
        <Box padding={8} background="neutral100">
          <Accordion expanded={expanded} onToggle={() => setExpanded((s) => !s)} id="acc-3">
            <AccordionToggle
              togglePosition="left"
              title="User informations 3"
              description="The following contains information about the current user 3"
            />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
        <Box padding={8} background="neutral0">
          <Accordion expanded={expanded} onToggle={() => setExpanded((s) => !s)} id="acc-4" variant="secondary">
            <AccordionToggle
              togglePosition="left"
              title="User informations 4"
              action={<IconButton onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />}
            />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
      </div>
    );
  },

  name: 'base',
} satisfies Story;

export const Group = {
  render: () => {
    const [expandedID, setExpandedID] = React.useState<string | null>(null);

    const handleToggle = (id: string) => () => {
      setExpandedID((s) => (s === id ? null : id));
    };

    return (
      <div>
        <Box padding={8} background="neutral0">
          <AccordionGroup
            error="The components contain error(s)"
            footer={
              <Flex justifyContent="center" height="48px" background="neutral150">
                <TextButton disabled startIcon={<Plus />}>
                  Add an entry
                </TextButton>
              </Flex>
            }
            label="Label"
            labelAction={
              <Tooltip description="Content of the tooltip">
                <button
                  aria-label="Information about the email"
                  style={{
                    border: 'none',
                    padding: 0,
                    background: 'transparent',
                  }}
                >
                  <Information aria-hidden />
                </button>
              </Tooltip>
            }
          >
            <Accordion
              error="The components contain error(s)"
              expanded={expandedID === 'acc-1'}
              onToggle={handleToggle('acc-1')}
              id="acc-1"
              size="S"
            >
              <AccordionToggle
                startIcon={<User aria-hidden />}
                action={
                  <Flex horizontal gap={0}>
                    <IconButton noBorder onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />
                    <IconButton noBorder onClick={() => console.log('delete')} label="Delete" icon={<Trash />} />
                  </Flex>
                }
                title="User informations"
                togglePosition="left"
              />
              <AccordionContent>
                <Box padding={3}>
                  <TextInput label="Name" />
                </Box>
              </AccordionContent>
            </Accordion>
            <Accordion
              error="The component contain error(s)"
              expanded={expandedID === 'acc-2'}
              onToggle={handleToggle('acc-2')}
              id="acc-2"
              size="S"
            >
              <AccordionToggle title="User informations" togglePosition="left" />
              <AccordionContent>
                <Box padding={3}>
                  <Typography>My name is John Duff</Typography>
                </Box>
              </AccordionContent>
            </Accordion>
            <Accordion expanded={expandedID === 'acc-3'} onToggle={handleToggle('acc-3')} id="acc-3" size="S">
              <AccordionToggle title="User informations" togglePosition="left" />
              <AccordionContent>
                <Box padding={3}>
                  <Typography>My name is Michka</Typography>
                </Box>
              </AccordionContent>
            </Accordion>
            <Accordion expanded={expandedID === 'acc-4'} onToggle={handleToggle('acc-4')} id="acc-4" size="S">
              <AccordionToggle startIcon={<User aria-hidden />} title="User informations" togglePosition="left" />
              <AccordionContent>
                <Box padding={3}>
                  <Typography>My name is John Duff</Typography>
                </Box>
              </AccordionContent>
            </Accordion>
          </AccordionGroup>
        </Box>
      </div>
    );
  },

  name: 'accordion-group',
} satisfies Story;

export const Keyboard = {
  render: () => {
    return (
      <KeyboardNavigable attributeName="data-strapi-accordion-toggle">
        <Box padding={8} background="neutral100">
          <Accordion expanded={false} id="acc-1">
            <AccordionToggle
              title="User informations"
              description="The following contains information about the current user"
            />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
        <Box padding={8} background="neutral0">
          <Accordion expanded={false} id="acc-2">
            <AccordionToggle
              variant="secondary"
              title="User informations 2"
              description="The following contains information about the current user 2"
            />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
        <Box padding={8} background="neutral100">
          <Accordion expanded={false} id="acc-3">
            <AccordionToggle
              togglePosition="left"
              title="User informations 3"
              description="The following contains information about the current user 3"
            />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
        <Box padding={8} background="neutral0">
          <Accordion expanded={false} id="acc-4">
            <AccordionToggle
              variant="secondary"
              togglePosition="left"
              title="User informations 4"
              action={<IconButton onClick={() => console.log('edit')} label="Edit" icon={<Pencil />} />}
            />
            <AccordionContent>
              <Box padding={3}>
                <Typography>My name is John Duff</Typography>
              </Box>
            </AccordionContent>
          </Accordion>
        </Box>
      </KeyboardNavigable>
    );
  },

  name: 'keyboard navigable',
} satisfies Story;

export const Expanded = {
  render: () => (
    <Accordion expanded id="acc-1">
      <AccordionToggle
        title="User informations"
        description="The following contains information about the current user"
      />
      <AccordionContent>
        <Box padding={3}>
          <Typography>My name is John Duff</Typography>
        </Box>
      </AccordionContent>
    </Accordion>
  ),

  name: 'expanded',
} satisfies Story;
