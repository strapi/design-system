import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, Typography } from '@strapi/design-system';

const meta: Meta<typeof Radio> = {
  title: 'Inputs/Radio',
  component: Radio,
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Base = {
  render: () => {
    const [selected, setSelected] = React.useState<string>();

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
