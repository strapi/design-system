import { Meta, StoryObj } from '@storybook/react-vite';

import { Main, SkipToContent } from '@strapi/design-system/next';

const meta: Meta<typeof Main> = {
  title: 'Next/Main',
  component: Main,
  args: {
    labelledBy: 'main-content-title',
  },
  argTypes: {
    labelledBy: {
      control: 'text',
      description: 'The id of the element that names the landmark.',
      table: { defaultValue: { summary: 'main-content-title' } },
    },
  },
  render: (args) => (
    <div style={{ position: 'relative', fontSize: '1.4rem' }}>
      <SkipToContent>Skip to content</SkipToContent>
      <p style={{ padding: '1.6rem 0' }}>
        Press Tab to show the skip link, then Enter to move the focus to the content.
      </p>
      <Main {...args}>
        <h1 id="main-content-title" style={{ fontSize: '2rem', fontWeight: 600 }}>
          Content Manager
        </h1>
        <p>The main content of the page.</p>
      </Main>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Base = {
  name: 'base',
} satisfies Story;
