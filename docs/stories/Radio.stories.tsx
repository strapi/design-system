import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, Typography } from '@strapi/design-system';

const meta: Meta<typeof Radio> = {
  title: 'Design System/Components/Radio',
  component: Radio,
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Base = {
  render: () => {
    const [selected, setSelected] = useState();

    return (
      <div>
        <Typography variant="beta" id="trophy-champions">
          Make a choice
        </Typography>
        <RadioGroup
          labelledBy="trophy-champions"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
          name="meal"
        >
          <Radio value="pizza">Pizza</Radio>
          <Radio value="bagel">Bagel</Radio>
        </RadioGroup>
      </div>
    );
  },

  name: 'base',
} satisfies Story;
