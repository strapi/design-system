import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@strapi/design-system';
import { Accordion } from '@strapi/design-system/v2';

const meta: Meta<typeof Accordion.Root> = {
  title: 'Design System/Components/v2/Accordion',
  component: Accordion,
  args: {
    disabled: false,
    size: 'M',
    variant: 'primary',
  },
};

export default meta;

type Story = StoryObj<typeof Accordion.Root>;

export const Base = {
  render: ({ disabled, size, variant }) => {
    return (
      <Accordion.Root size={size} disabled={disabled} variant={variant}>
        <Accordion.Item value="value-1">
          <Accordion.Header>
            <Accordion.Trigger>
              <Flex>
                Is it Accessible?
                <Accordion.Icon />
              </Flex>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="value-2">
          <Accordion.Header>
            <Accordion.Trigger>Is it Styled?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <p>{`Yes. It's styled the match the design-system out of the box.`}</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="value-3">
          <Accordion.Header>
            <Accordion.Trigger>Can it be animated?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <p>{`Yes. One day we'll do it.`}</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  },
} satisfies Story;
