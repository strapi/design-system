import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { LiveRegions, Flex, Button, useNotifyAT } from '@strapi/design-system';

const meta: Meta<typeof LiveRegions> = {
  title: 'Design System/Components/LiveRegions',
  component: LiveRegions,
};

export default meta;

type Story = StoryObj<typeof LiveRegions>;

export const Log = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <Flex direction="column" alignItems="center" gap={3}>
        <Button onClick={() => setVisible((isVisible) => !isVisible)}>{visible ? 'Hide button' : 'Show button'}</Button>
        {visible ? <StoryComponent notifyType="log" /> : null}
      </Flex>
    );
  },

  name: 'log',
} satisfies Story;

export const Alert = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <Flex direction="column" alignItems="center" gap={3}>
        <Button onClick={() => setVisible((isVisible) => !isVisible)}>{visible ? 'Hide button' : 'Show button'}</Button>
        {visible ? <StoryComponent notifyType="alert" /> : null}
      </Flex>
    );
  },

  name: 'alert',
} satisfies Story;

export const Status = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <Flex direction="column" alignItems="center" gap={3}>
        <Button onClick={() => setVisible((isVisible) => !isVisible)}>{visible ? 'Hide button' : 'Show button'}</Button>
        {visible ? <StoryComponent notifyType="status" /> : null}
      </Flex>
    );
  },

  name: 'status',
} satisfies Story;

// This component exist to demonstrate the unmounting effect of the hook
// in a condition, in the storybook
const StoryComponent = ({ notifyType }: { notifyType: 'log' | 'alert' | string }) => {
  const { notifyAlert, notifyStatus, notifyLog } = useNotifyAT();

  const handleClick = () => {
    if (notifyType === 'log') {
      notifyLog('This is a log message');
    } else if (notifyType === 'alert') {
      notifyAlert('This is an alert');
    } else {
      notifyStatus('This is a status message');
    }
  };

  return <Button onClick={handleClick}>Toggle {notifyType}</Button>;
};
