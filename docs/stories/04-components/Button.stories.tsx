import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonProps, Grid, Typography } from '@strapi/design-system';
import { CheckCircle, CrossCircle } from '@strapi/icons';
import { outdent } from 'outdent';

const BUTTON_VARIANTS = [
  'default',
  'secondary',
  'tertiary',
  'success',
  'success-light',
  'danger',
  'danger-light',
  'ghost',
] as const;

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'submit',
    disabled: false,
    fullWidth: false,
    loading: false,
    onClick: fn(),
    size: 'M',
    variant: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
    },
  },
  render: (args) => <Button {...args} />,
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      source: {
        code: outdent`
          <Button>submit</Button>
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Button disabled>submit</Button>
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const Loading = {
  args: {
    children: 'submitting...',
    loading: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Button loading>submitting...</Button>
        `,
      },
    },
  },
  name: 'loading',
} satisfies Story;

export const StartIcon = {
  args: {
    startIcon: <CheckCircle />,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Button startIcon={<CheckCircle />}>submit</Button>
        `,
      },
    },
  },
  name: 'with start icon',
} satisfies Story;

export const EndIcon = {
  args: {
    endIcon: <CrossCircle />,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Button endIcon={<CheckCircle />}>submit</Button>
        `,
      },
    },
  },
  name: 'with end icon',
} satisfies Story;

export const SizeSmall = {
  args: {
    size: 'S',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Button size="S">submit</Button>
        `,
      },
    },
  },
  name: 'size small',
} satisfies Story;

export const SizeLarge = {
  args: {
    size: 'L',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Button size="L">submit</Button>
        `,
      },
    },
  },
  name: 'size large',
} satisfies Story;

const OPTIONS = ['default', 'disabled', 'loading', 'size S', 'size M', 'size L', 'startIcon', 'endIcon'];

export const AllVariants = {
  render: () => {
    return (
      <Grid.Root gridCols={OPTIONS.length + 1} gap={6}>
        <Grid.Item xs={1}>
          <Typography variant="sigma">Variant</Typography>
        </Grid.Item>
        {OPTIONS.map((opt) => (
          <Grid.Item xs={1} key={opt}>
            <Typography variant="sigma">{opt}</Typography>
          </Grid.Item>
        ))}
        {BUTTON_VARIANTS.map((variant) => {
          return (
            <React.Fragment key={variant}>
              <Grid.Item xs={1}>
                <Typography>{variant}</Typography>
              </Grid.Item>
              {OPTIONS.map((opt) => {
                const props: ButtonProps = {
                  variant,
                  size: 'M',
                };

                if (['disabled', 'loading'].includes(opt)) {
                  props[opt] = true;
                }

                if (opt.startsWith('size')) {
                  props.size = opt.split(' ')[1] as 'S' | 'M' | 'L';
                }

                if (['startIcon', 'endIcon'].includes(opt)) {
                  props[opt] = <CheckCircle />;
                }

                return (
                  <Grid.Item xs={1} alignItems="center" justifyContent="center" key={`${variant}-${opt}`}>
                    <Button {...props}>submit</Button>
                  </Grid.Item>
                );
              })}
            </React.Fragment>
          );
        })}
      </Grid.Root>
    );
  },
  name: 'all variants',
};
