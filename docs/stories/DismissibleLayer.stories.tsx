import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Typography, DismissibleLayer } from '@strapi/design-system';

const meta: Meta<typeof DismissibleLayer> = {
  title: 'Design System/Technical Components/DismissibleLayer',
  component: DismissibleLayer,
};

export default meta;

type Story = StoryObj<typeof DismissibleLayer>;

export const Base = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      let timeout: NodeJS.Timeout | null = null;

      if (!isVisible) {
        timeout = setTimeout(() => setIsVisible(true), 1000);
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }, [isVisible]);

    return isVisible ? (
      <DismissibleLayer onEscapeKeyDown={() => setIsVisible(false)} onPointerDownOutside={() => setIsVisible(false)}>
        <Typography
          style={{
            backgroundColor: '#ccc',
            padding: '20px',
            display: 'block',
          }}
        >
          press escape or click outside to dismiss
        </Typography>
      </DismissibleLayer>
    ) : (
      <></>
    );
  },

  name: 'base',
} satisfies Story;
