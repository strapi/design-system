import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, LiveRegions, useNotifyAT } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof LiveRegions> = {
  title: 'Next/LiveRegions',
  component: LiveRegions,
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof LiveRegions>;

/**
 * Storybook wraps every story in the legacy DesignSystemProvider, which already renders the live regions.
 * The story does not render a second set, so the ids stay unique
 */
export const Base = {
  render: () => {
    const { notifyLog, notifyStatus, notifyAlert } = useNotifyAT();
    const [last, setLast] = useState('Nothing yet');

    const announce = (kind: 'log' | 'status' | 'alert') => {
      const message = `A ${kind} message at ${new Date().toLocaleTimeString()}`;
      const notify = { log: notifyLog, status: notifyStatus, alert: notifyAlert }[kind];

      notify(message);
      setLast(message);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.6rem' }}>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Button onClick={() => announce('log')}>notifyLog</Button>
          <Button onClick={() => announce('status')}>notifyStatus</Button>
          <Button onClick={() => announce('alert')}>notifyAlert</Button>
        </div>
        <p style={{ fontSize: '1.4rem', margin: 0 }}>Last announcement: {last}</p>
      </div>
    );
  },
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'base',
} satisfies Story;
