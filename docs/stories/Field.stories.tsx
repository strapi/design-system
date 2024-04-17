import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { FieldLabel, FieldHint, FieldError, FieldInput, Field, Flex, FieldAction } from '@strapi/design-system';
import { PasswordField } from '@strapi/icons/symbols';

const meta: Meta<typeof Field> = {
  title: 'Design System/Components/Field',
  component: Field,
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Base = {
  render: () => (
    <Field name="email" required={false}>
      <Flex direction="column" alignItems="flex-start" gap={1}>
        <FieldLabel>Email</FieldLabel>
        <FieldInput type="text" placeholder="test@strapi.io" />
      </Flex>
    </Field>
  ),

  name: 'base',
} satisfies Story;

export const WithDescription = {
  render: () => (
    <Field name="email" hint="Normally your name seperated by a dot.">
      <Flex direction="column" alignItems="flex-start" gap={1}>
        <FieldLabel>Email</FieldLabel>
        <FieldInput type="text" placeholder="john.smith@strapi.io" value="" />
        <FieldHint />
      </Flex>
    </Field>
  ),

  name: 'with description',
} satisfies Story;

export const WithError = {
  render: () => {
    const [value, setValue] = React.useState('john.smith@google.com');

    const handleOnChange = (event) => {
      setValue(event.target.value);
    };

    return (
      <Field name="password" hint="Normally your name seperated by a dot." error="Email must end in strapi.io">
        <Flex direction="column" alignItems="flex-start" gap={1}>
          <FieldLabel>Email</FieldLabel>
          <FieldInput type="email" placeholder="john.smith@strapi.io" value={value} onChange={handleOnChange} />
          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    );
  },

  name: 'with error',
} satisfies Story;

export const AddingActions = {
  render: () => {
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Field name="password">
        <Flex direction="column" alignItems="flex-start" gap={1}>
          <FieldLabel>Password</FieldLabel>
          <FieldInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAction={
              <FieldAction
                onClick={() => setShowPassword((s) => !s)}
                label={`${showPassword ? 'hide' : 'show'} password`}
              >
                <PasswordField />
              </FieldAction>
            }
          />
          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    );
  },

  name: 'adding actions',
} satisfies Story;
