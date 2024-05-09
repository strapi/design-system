import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { BaseRadio, RadioGroup, Typography } from '@strapi/design-system';

const meta: Meta<typeof BaseRadio> = {
  title: 'Design System/Technical Components/BaseRadio',
  component: BaseRadio,
};

export default meta;

type Story = StoryObj<typeof BaseRadio>;

export const Base = {
  render: () => {
    const [selected, setSelected] = React.useState<string>();

    return (
      <div>
        <Typography variant="beta" textColor="neutral800" id="trophy-champions">
          Make a choice
        </Typography>
        <RadioGroup
          labelledBy="trophy-champions"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelected(e.target.value)}
          value={selected}
          name="prefered-meal"
        >
          <div>
            <label htmlFor="pizza">Pizza</label>
            <BaseRadio value="pizza" id="pizza" />
          </div>
          <div>
            <label htmlFor="bagel">Bagel</label>
            <BaseRadio value="bagel" id="bagel" />
          </div>
        </RadioGroup>
      </div>
    );
  },

  name: 'base',
} satisfies Story;

export const Disabled = {
  render: () => {
    const [selected, setSelected] = React.useState<string>();

    return (
      <div>
        <Typography variant="beta" id="trophy-champions">
          Trophy champion
        </Typography>
        <RadioGroup
          labelledBy="trophy-champions"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelected(e.target.value)}
          value={selected}
          name="prefered-meal"
        >
          <div>
            <label htmlFor="first">Mario</label>
            <BaseRadio value="first" id="first" />
          </div>
          <div>
            <label htmlFor="second">Luigi</label>
            <BaseRadio value="second" id="second" disabled />
          </div>
          <div>
            <label htmlFor="third">Wario</label>
            <BaseRadio value="third" id="third" />
          </div>
        </RadioGroup>
      </div>
    );
  },

  name: 'disabled',
} satisfies Story;
