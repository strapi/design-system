import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Portal } from '@strapi/design-system/next';

const BOX_STYLE = {
  padding: '1.6rem',
  border: '1px dashed var(--neutral-300)',
  borderRadius: '0.4rem',
  fontSize: '1.4rem',
} as const;

const meta: Meta<typeof Portal> = {
  title: 'Next/Portal',
  component: Portal,
};

export default meta;

type Story = StoryObj<typeof Portal>;

const IntoContainer = () => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <div style={{ display: 'flex', gap: '1.6rem' }}>
      <div style={BOX_STYLE}>
        <p>The Portal is written here…</p>
        <Portal container={container}>
          <p>…and renders in the other box.</p>
        </Portal>
      </div>
      <div ref={setContainer} style={BOX_STYLE} />
    </div>
  );
};

export const Container = {
  render: () => <IntoContainer />,
  name: 'container',
} satisfies Story;
