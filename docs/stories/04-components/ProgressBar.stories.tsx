import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Flex, ProgressBar, ProgressBarProps, Typography } from '@strapi/design-system';
import { outdent } from 'outdent';

interface ProgressArgs extends ProgressBarProps {}

const meta: Meta<ProgressArgs> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story) => (
      <Flex padding={10} width="100%" height="100%" justifyContent="center" background="neutral800">
        <Story />
      </Flex>
    ),
  ],
  render: (args) => {
    return <ProgressBar {...args} />;
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M'],
    },
    value: {
      control: 'range',
    },
  },
  args: {
    size: 'M',
    value: 50,
  },
};

export default meta;

type Story = StoryObj<ProgressArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Animated = {
  name: 'animated preview',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      source: {
        code: outdent`
        <Flex direction="column" gap={4}>
          <ProgressBar {...args} value={progress} />
          <Typography textColor="neutral0">{\`Loading \${progress}%\`}</Typography>
        </Flex>
        `,
      },
    },
  },
  render: (args) => {
    const [progress, setProgress] = React.useState(0);
    const interval = React.useRef<NodeJS.Timeout>(undefined);

    const startAnimation = React.useCallback(() => {
      interval.current = setInterval(() => {
        setProgress((prev) => {
          /**
           * Random number between 0-10
           */
          const newProgress = Math.floor(Math.random() * 10);

          return Math.min(prev + newProgress, 100);
        });
      }, 400);
    }, []);

    React.useEffect(() => {
      startAnimation();

      return () => {
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = undefined;
        }
      };
    }, [startAnimation]);

    React.useEffect(() => {
      if (progress === 100) {
        if (interval.current) {
          clearInterval(interval.current);
          setProgress(0);
          startAnimation();
        }
      }
    }, [progress, startAnimation]);

    return (
      <Flex direction="column" gap={4}>
        <ProgressBar {...args} value={progress} />
        <Typography textColor="neutral0">{`Loading ${progress}%`}</Typography>
      </Flex>
    );
  },
} satisfies Story;
