import * as React from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { DatePicker, Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system';
import { default as outdent } from 'outdent';

const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/DatePicker',
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const Template: Story = {
  render: ({ ...props }) => {
    const [, updateArgs] = useArgs();

    return (
      <DatePicker
        {...props}
        onChange={updateArgs}
        onClear={() =>
          updateArgs(() => {
            value: undefined;
          })
        }
      />
    );
  },
};

export const Base = {
  ...Template,
  args: {
    initialDate: new Date(),
  },
  name: 'base',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
        />
        `,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  ...Template,
  name: 'disabled',
  args: {
    ...Base.args,
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          disabled
        />
        `,
      },
    },
  },
} satisfies Story;

export const MinMaxDate = {
  args: {
    ...Base.args,
    minDate: new Date('2022-01-01'),
    maxDate: new Date('2022-12-31'),
  },

  name: 'min/max date',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          minDate={new Date('2022-01-01')}
          maxDate={new Date('2022-12-31')}
        />
        `,
      },
    },
  },
} satisfies Story;

export const Locale = {
  args: {
    ...MinMaxDate.args,
    locale: 'de-DE',
  },

  name: 'locale',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          locale="de-DE"
        />
        `,
      },
    },
  },
} satisfies Story;

export const Sizing = {
  args: {
    ...Locale.args,
    size: 'S',
  },

  name: 'sizing',
  parameters: {
    docs: {
      source: {
        code: outdent`
        <DatePicker
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          size='S'
        />
        `,
      },
    },
  },
} satisfies Story;

export const WithField = {
  render: ({ error, hint, label, ...props }) => {
    return (
      <Field id="with_field" error={error} hint={hint}>
        <FieldLabel>{label}</FieldLabel>
        <DatePicker id="with_field" error={error} {...props} />
        <FieldError />
        <FieldHint />
      </Field>
    );
  },
  args: {
    ...Base.args,
    label: 'Date',
    error: 'Error',
    hint: 'Description line lorem ipsum',
  },

  parameters: {
    docs: {
      source: {
        code: outdent`
        <Field
          id="with_field"
          error={error}
          hint={hint}
        >
          <FieldLabel>{label}</FieldLabel>
          <DatePicker id="with_field" error={error} />
          <FieldError />
          <FieldHint />
        </Field>
      `,
      },
    },
  },

  name: 'with field',
};
