import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { ToggleInput, Flex, Button } from '@strapi/design-system';

const meta: Meta<typeof ToggleInput> = {
  title: 'Design System/Components/ToggleInput',
  component: ToggleInput,
};

export default meta;

type Story = StoryObj<typeof ToggleInput>;

export const Base = {
  render: () => {
    const [error, toggleError] = React.useState<string>();
    const [disabled, toggleDisabled] = React.useState(false);

    return (
      <Flex direction="column" alignItems="stretch" gap={11}>
        <ToggleInput
          label="Enabled"
          onLabel="True"
          offLabel="False"
          hint="Enable your SSO provider for users"
          disabled={disabled}
          error={error}
        />
        <Flex gap={2} justifyContent="center">
          <Button
            variant="danger-light"
            onClick={() => toggleError((s) => (s ? undefined : "That's not a boolean option!"))}
          >
            {`${error ? 'Hide' : 'Show'} the error state`}
          </Button>
          <Button variant="tertiary" onClick={() => toggleDisabled((s) => !s)}>
            {`${disabled ? 'Hide' : 'Show'} the disabled state`}
          </Button>
        </Flex>
      </Flex>
    );
  },

  name: 'base',
} satisfies Story;

export const Controlled = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <ToggleInput
        label="Enabled"
        onLabel="True"
        offLabel="False"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },

  name: 'controlled',
} satisfies Story;

export const SizeS = {
  render: () => {
    return <ToggleInput size="S" label="Enabled" onLabel="True" offLabel="False" />;
  },

  name: 'size S',
} satisfies Story;

export const Nullish = {
  render: () => {
    const [checked, setChecked] = React.useState<boolean | null>(null);

    return (
      <ToggleInput
        label="Enabled"
        onLabel="True"
        offLabel="False"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        clearLabel="clear"
        onClear={() => setChecked(null)}
      />
    );
  },

  name: 'nullish',
} satisfies Story;
