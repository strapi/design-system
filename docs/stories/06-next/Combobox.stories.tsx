import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from '@strapi/design-system/next';

const FRUITS = [
  'Apple',
  'Banana',
  'Blueberry',
  'Cherry',
  'Grape',
  'Kiwi',
  'Lemon',
  'Mango',
  'Orange',
  'Peach',
  'Pear',
  'Pineapple',
  'Strawberry',
  'Watermelon',
];

const meta: Meta<typeof Combobox> = {
  title: 'Next/Combobox',
  component: Combobox,
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ maxWidth: '20rem' }}>
        <Combobox items={FRUITS} value={value} onValueChange={setValue}>
          <div className="relative">
            <ComboboxInput placeholder="Pick a fruit" className="pr-14" />
            <div className="absolute inset-y-0 right-1 flex items-center gap-0.5">
              <ComboboxClear />
              <ComboboxTrigger />
            </div>
          </div>
          <ComboboxContent>
            <ComboboxEmpty>No fruit found</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                  <ComboboxItemIndicator />
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Base = {
  name: 'base',
} satisfies Story;
