import { Meta, StoryObj } from '@storybook/react-vite';
import { LiveRegions, Flex, Button, useNotifyAT } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof LiveRegions> = {
  title: 'Components/LiveRegions',
  component: LiveRegions,
};

export default meta;

type Story = StoryObj<typeof LiveRegions>;

export const Log = {
  render: () => {
    return (
      <Flex direction="column" alignItems="center" gap={3}>
        <StoryComponent notifyType="log" />
      </Flex>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          const { notifyLog } = useNotifyAT();

          <Button onClick={() => notifyLog('This is a log message')}>Notify log</Button>
        `,
      },
    },
  },
  name: 'log',
} satisfies Story;

export const Alert = {
  render: () => {
    return (
      <Flex direction="column" alignItems="center" gap={3}>
        <StoryComponent notifyType="alert" />
      </Flex>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          const { notifyAlert } = useNotifyAT();

          <Button onClick={() => notifyAlert('This is an alert')}>Notify alert</Button>
        `,
      },
    },
  },
  name: 'alert',
} satisfies Story;

export const Status = {
  render: () => {
    return (
      <Flex direction="column" alignItems="center" gap={3}>
        <StoryComponent notifyType="status" />
      </Flex>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          const { notifyStatus } = useNotifyAT();

          <Button onClick={() => notifyStatus('This is a status message')}>Notify status</Button>
        `,
      },
    },
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

  return <Button onClick={handleClick}>Notify {notifyType}</Button>;
};
