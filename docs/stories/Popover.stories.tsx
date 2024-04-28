import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Popover, Box, Typography } from '@strapi/design-system';

const meta: Meta<typeof Popover> = {
  title: 'Design System/Components/Popover',
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Centered = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null!);

    return (
      <div
        style={{
          marginLeft: '200px',
        }}
      >
        <button ref={buttonRef} onClick={() => setVisible((s) => !s)}>
          <Typography>Open popover</Typography>
        </button>
        {visible && (
          <Popover centered source={buttonRef} spacing={16} onDismiss={() => setVisible(false)}>
            <ul
              style={{
                width: '200px',
              }}
            >
              {Array(15)
                .fill(null)
                .map((_, index) => (
                  <Box color="neutral800" key={index} padding={3} tag="li">
                    Element{index}
                  </Box>
                ))}
            </ul>
          </Popover>
        )}
      </div>
    );
  },

  name: 'centered',
} satisfies Story;

export const FullWidth = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null!);

    return (
      <Box padding={10}>
        <button ref={buttonRef} onClick={() => setVisible((s) => !s)}>
          <Typography>Open popover</Typography>
        </button>
        {visible && (
          <Popover source={buttonRef} fullWidth spacing={16} onDismiss={() => setVisible(false)}>
            <ul
              style={{
                width: '200px',
              }}
            >
              {Array(15)
                .fill(null)
                .map((_, index) => (
                  <Box color="neutral800" key={index} padding={3} tag="li">
                    Element{index}
                  </Box>
                ))}
            </ul>
          </Popover>
        )}
      </Box>
    );
  },

  name: 'full width',
} satisfies Story;

export const OnReachEnd = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    const [items, setItems] = React.useState(Array(10).fill(null));
    const buttonRef = React.useRef<HTMLButtonElement>(null!);

    return (
      <Box padding={10}>
        <button id="popover1" ref={buttonRef} onClick={() => setVisible((s) => !s)}>
          <Typography>Open popover</Typography>
        </button>
        {visible && (
          <Popover
            source={buttonRef}
            spacing={16}
            id="on-reach-end"
            intersectionId="test-123"
            onReachEnd={() => setItems(Array(15).fill(null))}
            onDismiss={() => setVisible(false)}
          >
            <ul
              style={{
                width: '200px',
              }}
              id="list"
              tabIndex={-1}
            >
              {items.map((_, index) => (
                <Box color="neutral800" key={index} padding={3} tag="li" id={`item-${index}`}>
                  Element{index}
                </Box>
              ))}
            </ul>
          </Popover>
        )}
      </Box>
    );
  },

  name: 'onReachEnd',
} satisfies Story;

export const OverflowRight = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null!);

    return (
      <div
        style={{
          height: '20vh',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 20,
          }}
        >
          <div>
            <button ref={buttonRef} onClick={() => setVisible((s) => !s)}>
              <Typography>Open popover</Typography>
            </button>
            {visible && (
              <Popover centered source={buttonRef} spacing={16} onDismiss={() => setVisible(false)}>
                <ul
                  style={{
                    width: '200px',
                  }}
                >
                  {Array(15)
                    .fill(null)
                    .map((_, index) => (
                      <Box color="neutral800" key={index} padding={3} tag="li">
                        Element{index}
                      </Box>
                    ))}
                </ul>
              </Popover>
            )}
          </div>
        </div>
      </div>
    );
  },

  name: 'overflow-right',
} satisfies Story;
