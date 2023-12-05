import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Portal, Typography } from '@strapi/design-system';

const meta: Meta<typeof Portal> = {
  title: 'Design System/Technical Components/Portal',
  component: Portal,
};

export default meta;

type Story = StoryObj<typeof Portal>;

export const Base = {
  render: () => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    return (
      <>
        <div ref={(ref) => setContainer(ref!)} />
        <Portal container={container}>
          <aside>
            <Typography>This is rendered outside the root react app</Typography>
          </aside>
        </Portal>
      </>
    );
  },

  name: 'base',
} satisfies Story;
