import { Meta, StoryObj } from '@storybook/react';
import { Check } from '@strapi/icons';
import { Select } from '@strapi/ui-primitives';

const meta: Meta<typeof Select.Root> = {
  title: 'Primitives/Select',
  component: Select.Root,
};

export default meta;

type Story = StoryObj<typeof Select.Root>;

export const SingleItem = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select an option..." />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" sideOffset={4}>
          <Select.Viewport>
            <Select.Item value="1">
              <Select.ItemText>Option 1</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="2">
              <Select.ItemText>Option 2</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="3">
              <Select.ItemText>Option 3</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="4">
              <Select.ItemText>Option 4</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  ),

  name: 'Single Item',
} satisfies Story;

export const MultipleItems = {
  render: () => (
    <Select.Root multi>
      <Select.Trigger>
        <Select.Value placeholder="Select an option..." />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" sideOffset={4}>
          <Select.Viewport>
            <Select.Item value="1">
              <Select.ItemText>Option 1</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="2">
              <Select.ItemText>Option 2</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="3">
              <Select.ItemText>Option 3</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="4">
              <Select.ItemText>Option 4</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  ),

  name: 'Multiple Items',
} satisfies Story;

export const NestedItems = {
  render: () => (
    <Select.Root multi>
      <Select.Trigger>
        <Select.Value placeholder="Select an option..." />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" sideOffset={4}>
          <Select.Viewport>
            <Select.Item value="1">
              <Select.ItemText>Option 1</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="2">
              <Select.ItemText>Option 2</Select.ItemText>
              <Select.ItemIndicator>
                <Check />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Group>
              <Select.Label>Options 3 & 4</Select.Label>
              <Select.Item value="3">
                <Select.ItemText>Option 3</Select.ItemText>
                <Select.ItemIndicator>
                  <Check />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="4">
                <Select.ItemText>Option 3</Select.ItemText>
                <Select.ItemIndicator>
                  <Check />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  ),

  name: 'Nested Items',
} satisfies Story;
