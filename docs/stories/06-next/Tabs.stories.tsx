import { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const PANEL_STYLE = { padding: '1.6rem', fontSize: '1.4rem' };

const meta: Meta<typeof Tabs> = {
  title: 'Next/Tabs',
  component: Tabs,
  args: {
    defaultValue: 'base',
    variant: 'regular',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['regular', 'simple'],
      description: '`regular` draws folder tabs, `simple` draws uppercase labels with an underline.',
      table: { type: { summary: "'regular' | 'simple'" }, defaultValue: { summary: 'regular' } },
    },
    disabled: {
      control: 'select',
      options: [false, true, 'advanced'],
      description: '`true` disables every tab. A tab value disables that tab only.',
      table: { type: { summary: 'boolean | string' }, defaultValue: { summary: 'false' } },
    },
    hasError: {
      control: 'select',
      options: [undefined, 'base', 'advanced'],
      description: 'The value of the tab that shows the error colour.',
    },
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Manage your attribute">
        <TabsTrigger value="base">Base settings</TabsTrigger>
        <TabsTrigger value="advanced">Advanced settings</TabsTrigger>
      </TabsList>
      <TabsContent value="base">
        <div style={PANEL_STYLE}>The base settings.</div>
      </TabsContent>
      <TabsContent value="advanced">
        <div style={PANEL_STYLE}>The advanced settings.</div>
      </TabsContent>
    </Tabs>
  ),
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const AllVariantsAndStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.2rem', maxWidth: '64rem' }}>
      {(['regular', 'simple'] as const).map((variant) => (
        <Tabs key={variant} variant={variant} defaultValue="base" disabled="disabled" hasError="error">
          <TabsList aria-label={`${variant} tabs`}>
            <TabsTrigger value="base">Selected</TabsTrigger>
            <TabsTrigger value="other">Not selected</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
            <TabsTrigger value="disabled">Disabled</TabsTrigger>
          </TabsList>
          <TabsContent value="base">
            <div style={PANEL_STYLE}>{`The ${variant} variant.`}</div>
          </TabsContent>
        </Tabs>
      ))}
    </div>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
    controls: { disable: true },
  },
  name: 'all variants and states',
} satisfies Story;
