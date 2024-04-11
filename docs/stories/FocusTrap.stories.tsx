import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { FocusTrap, Box, Flex, Typography, Button } from '@strapi/design-system';
import { Cross } from '@strapi/icons';

const meta: Meta<typeof FocusTrap> = {
  title: 'Design System/Technical Components/FocusTrap',
  component: FocusTrap,
};

export default meta;

type Story = StoryObj<typeof FocusTrap>;

export const Base = {
  render: () => <ExampleComponent />,
  name: 'base',
} satisfies Story;

export const WithoutAutoFocus = {
  render: () => <ExampleComponent skipAutoFocus />,
  name: 'withoutAutoFocus',
} satisfies Story;

const TrappedComponent = ({ onClose, skipAutoFocus }) => {
  const [newLastVisible, setNewLastVisible] = useState(false);

  return (
    <FocusTrap onEscape={onClose} skipAutoFocus={skipAutoFocus}>
      <Box background="neutral0" padding={4} hasRadius style={{ width: '600px' }}>
        <Flex direction="column" alignItems="center" gap={4}>
          <Flex justifyContent="space-between">
            <Typography variant="beta" as="h2">
              Hey folks!
            </Typography>
            <button
              type="button"
              style={{ border: 'none', background: 'transparent' }}
              onClick={onClose}
              aria-label="Close"
            >
              <Cross aria-hidden />
            </button>
          </Flex>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Typography>
          <Flex justifyContent="space-between">
            <Button id="second">Second focusable</Button>
            <Button id="last" onClick={() => setNewLastVisible(true)}>
              Last focusable (at the beginning)
            </Button>

            {newLastVisible && <Button id="real-last">Last focusable (at the end)</Button>}
          </Flex>
        </Flex>
      </Box>
    </FocusTrap>
  );
};

export const ExampleComponent = ({ skipAutoFocus = false }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Box background="neutral150" padding={10}>
      <Flex direction="column" alignItems="center" gap={2}>
        {visible && <TrappedComponent onClose={() => setVisible(false)} skipAutoFocus={skipAutoFocus} />}
        <Box background="neutral0" padding={4} hasRadius style={{ width: '600px' }}>
          <Typography variant="beta" as="h2">
            Outside the trap!
          </Typography>

          <Box paddingTop={2}>
            <Button onClick={() => setVisible(true)} id="trigger">
              Open the trap
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
