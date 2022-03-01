/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Cross from '@strapi/icons/Cross';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Flex } from '../Flex';

import { FocusTrap } from './FocusTrap';

const TrappedComponent = ({ onClose }) => {
  const [newLastVisible, setNewLastVisible] = useState(false);

  return (
    <FocusTrap onEscape={onClose}>
      <Box background="neutral0" padding={4} hasRadius style={{ width: '600px' }}>
        <Stack spacing={2}>
          <Flex justifyContent="space-between">
            <Typography variant="beta" as="h2">
              Hey folks!
            </Typography>
            <button style={{ border: 'none', background: 'transparent' }} onClick={onClose} aria-label="Close">
              <Cross aria-hidden={true} />
            </button>
          </Flex>
          <Box paddingTop={2} paddingBottom={2}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Typography>
          </Box>
          <Flex justifyContent="space-between">
            <Button id="second">Second focusable</Button>
            <Button id="last" onClick={() => setNewLastVisible(true)}>
              Last focusable (at the beginning)
            </Button>

            {newLastVisible && <Button id="real-last">Last focusable (at the end)</Button>}
          </Flex>
        </Stack>
      </Box>
    </FocusTrap>
  );
};

export const ExampleComponent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Box background="neutral150" padding={10}>
      <Stack spacing={2}>
        {visible && <TrappedComponent onClose={() => setVisible(false)} />}
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
      </Stack>
    </Box>
  );
};
