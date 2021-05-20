/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text, H2 } from '../Text';
import { Button } from '../Button';
import { Row } from '../Row';

import { FocusTrap } from './FocusTrap';

const TrappedComponent = ({ onClose }) => {
  return (
    <FocusTrap onEscape={onClose}>
      <Box background="neutral0" padding={4} hasRadius style={{ width: '600px' }}>
        <Stack size={2}>
          <Row justifyContent="space-between">
            <H2>Hey folks!</H2>
            <button style={{ border: 'none', background: 'transparent' }} onClick={onClose} aria-label="Close">
              <CloseAlertIcon aria-hidden={true} />
            </button>
          </Row>
          <Box paddingTop={2} paddingBottom={2}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Text>
          </Box>
          <Row justifyContent="space-between">
            <Button id="second">Second focusable</Button>
            <Button id="last">Last focusable</Button>
          </Row>
        </Stack>
      </Box>
    </FocusTrap>
  );
};

export const ExampleComponent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Box background="neutral150" padding={10}>
      <Stack size={2}>
        {visible && <TrappedComponent onClose={() => setVisible(false)} />}
        <Box background="neutral0" padding={4} hasRadius style={{ width: '600px' }}>
          <H2>Outside the trap!</H2>

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
