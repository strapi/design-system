import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Typography, DismissibleLayer, Button, Flex } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof DismissibleLayer> = {
  title: 'Utilities/DismissibleLayer',
  component: DismissibleLayer,
};

export default meta;

type Story = StoryObj<typeof DismissibleLayer>;

export const Base = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <Flex direction="column" gap={4}>
        <Button onClick={() => setIsVisible(true)}>Show DismissibleLayer</Button>
        {isVisible && (
          <DismissibleLayer
            onEscapeKeyDown={() => setIsVisible(false)}
            onPointerDownOutside={() => setIsVisible(false)}
          >
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
        )}
      </Flex>
    );

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
  parameters: {
    docs: {
      source: {
        code: outdent`
          const [isVisible, setIsVisible] = React.useState(true);
          
          return isVisible ? (
            <DismissibleLayer
              onEscapeKeyDown={() => setIsVisible(false)}
              onPointerDownOutside={() => setIsVisible(false)}
            >
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
          ) : ( <></> );
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;
