import { Meta, StoryObj } from '@storybook/react';
import { Check } from '@strapi/icons';
import { Combobox } from '@strapi/ui-primitives';

const meta: Meta<typeof Combobox.Root> = {
  title: 'Primitives/Combobox',
  component: Combobox.Root,
};

export default meta;

type Story = StoryObj<typeof Combobox.Root>;

export const BasicUsage = {
  render: () => (
    <Combobox.Root>
      <Combobox.Trigger>
        <Combobox.TextInput placeholder="Pick me" />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Viewport>
            <Combobox.Item value="1">
              <Combobox.ItemText>Option 1</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="2">
              <Combobox.ItemText>Option 2</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="3">
              <Combobox.ItemText>Option 3</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="4">
              <Combobox.ItemText>Option 4</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.NoValueFound>No value</Combobox.NoValueFound>
          </Combobox.Viewport>
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  ),

  name: 'Basic Usage',
} satisfies Story;

export const ListAutocomplete = {
  render: () => (
    <Combobox.Root autocomplete="list">
      <Combobox.Trigger>
        <Combobox.TextInput placeholder="Pick me" />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Viewport>
            <Combobox.Item value="mango">
              <Combobox.ItemText>Mango</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="apple">
              <Combobox.ItemText>Apple</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="Banana">
              <Combobox.ItemText>Banana</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="papaya">
              <Combobox.ItemText>Papaya</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="avocado">
              <Combobox.ItemText>Avocado</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.NoValueFound>No value</Combobox.NoValueFound>
          </Combobox.Viewport>
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  ),

  name: 'List Autocomplete',
} satisfies Story;

export const BothAutocomplete = {
  render: () => (
    <Combobox.Root autocomplete="both">
      <Combobox.Trigger>
        <Combobox.TextInput placeholder="Pick me" />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Viewport>
            <Combobox.Item value="1">
              <Combobox.ItemText>Banana</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="4">
              <Combobox.ItemText>Apples</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="2">
              <Combobox.ItemText>Oranges</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="3">
              <Combobox.ItemText>Kiwis</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="5">
              <Combobox.ItemText>Avocado</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.NoValueFound>No value</Combobox.NoValueFound>
          </Combobox.Viewport>
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  ),

  name: 'Both Autocomplete',
} satisfies Story;

export const ListContainsAutocomplete = {
  render: () => (
    <Combobox.Root autocomplete={{ type: 'list', filter: 'contains' }}>
      <Combobox.Trigger>
        <Combobox.TextInput placeholder="Pick me" />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Viewport>
            <Combobox.Item value="1">
              <Combobox.ItemText>Banana</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="4">
              <Combobox.ItemText>Apples</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="2">
              <Combobox.ItemText>Oranges</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="3">
              <Combobox.ItemText>Kiwis</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="5">
              <Combobox.ItemText>Avocado</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.NoValueFound>No value</Combobox.NoValueFound>
          </Combobox.Viewport>
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  ),

  name: 'List Contains Autocomplete',
} satisfies Story;

export const CreateCustomValues = {
  render: () => (
    <Combobox.Root allowCustomValue>
      <Combobox.Trigger>
        <Combobox.TextInput placeholder="Pick me" />
        <Combobox.Icon />
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Viewport>
            <Combobox.Item value="1">
              <Combobox.ItemText>Option 1</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="2">
              <Combobox.ItemText>Option 2</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="3">
              <Combobox.ItemText>Option 3</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="4">
              <Combobox.ItemText>Option 4</Combobox.ItemText>
              <Combobox.ItemIndicator>
                <Check />
              </Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.CreateItem>Create this item</Combobox.CreateItem>
          </Combobox.Viewport>
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  ),

  name: 'Create Custom Values',
} satisfies Story;
