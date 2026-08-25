import { Meta, StoryObj } from '@storybook/react-vite';
import { DesignSystemProvider, Loader, extendTheme, lightTheme } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Base = {
  render: () => <Loader>Loading content...</Loader>,
  name: 'base',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Loader>Loading content...</Loader>
        `,
      },
    },
  },
} satisfies Story;

export const Small = {
  render: () => <Loader small>Loading content...</Loader>,
  name: 'small',
  parameters: {
    docs: {
      source: {
        code: outdent`
          <Loader small>Loading content...</Loader>
        `,
      },
    },
  },
} satisfies Story;

const customTheme = extendTheme(lightTheme, {
  colors: {
    primary600: '#ff0000',
  },
});

export const CustomThemeColor = {
  render: () => (
    <DesignSystemProvider theme={customTheme}>
      <Loader>Loading content...</Loader>
    </DesignSystemProvider>
  ),
  name: 'custom theme color',
  parameters: {
    docs: {
      description: {
        story:
          'The spinner respects the `primary600` theme color. Here `primary600` is overridden to red (`#ff0000`) to verify the fix — without it the spinner would always appear purple.',
      },
      source: {
        code: outdent`
          const customTheme = extendTheme(lightTheme, {
            colors: { primary600: '#ff0000' },
          });

          <DesignSystemProvider theme={customTheme}>
            <Loader>Loading content...</Loader>
          </DesignSystemProvider>
        `,
      },
    },
  },
} satisfies Story;
