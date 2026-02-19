import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Combobox, ComboboxOption, DesignSystemProvider, Typography, Box } from '@strapi/design-system';
import { useTheme } from 'styled-components';
import { outdent } from 'outdent';

const meta: Meta<typeof DesignSystemProvider> = {
  title: 'Utilities/DesignSystemProvider/Nested Combobox (Repro)',
  component: DesignSystemProvider,
};

export default meta;

type Story = StoryObj<typeof DesignSystemProvider>;

/**
 * This story reproduces the issue described in:
 * https://github.com/strapi/design-system/issues/1998
 *
 * **Expected behavior:** Unmounting the nested DesignSystemProvider should only affect
 * the Combobox it wraps, not the global design system context.
 *
 * **Bug:** When unmounting, the global Strapi Admin context breaks (styles disappear).
 *
 * **Note:** This bug may only manifest in Strapi Admin, not in Storybook, because
 * Storybook's global provider setup might differ from Strapi Admin's.
 */
export const NestedComboboxWithLocalProvider: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    const theme = useTheme();

    return (
      <Box>
        <Typography variant="beta" tag="h2" marginBottom={4}>
          Global Context Check (should always work)
        </Typography>
        <Box padding={4} background="neutral100" borderRadius="4px" marginBottom={4}>
          <Typography>
            This box uses the global DesignSystemProvider. If styles break here after
            unmounting the nested provider below, the bug is reproduced.
          </Typography>
          <Button variant="primary" style={{ marginTop: '1rem' }}>
            Global Button (should stay styled)
          </Button>
        </Box>

        <Typography variant="beta" tag="h2" marginBottom={4}>
          Nested Provider (simulates Strapi plugin)
        </Typography>
        <Button variant="secondary" onClick={() => setVisible((v) => !v)} marginBottom={4}>
          {visible ? 'Unmount nested DesignSystemProvider' : 'Mount nested DesignSystemProvider'}
        </Button>

        {visible && (
          <Box padding={4} background="neutral150" borderRadius="4px" border="1px solid" borderColor="neutral200">
            <DesignSystemProvider theme={theme}>
              <Typography variant="omega" marginBottom={2}>
                Nested provider active (this should unmount when clicking the button above)
              </Typography>
              <Combobox label="My Item">
                <ComboboxOption value="1">Item 1</ComboboxOption>
                <ComboboxOption value="2">Item 2</ComboboxOption>
                <ComboboxOption value="3">Item 3</ComboboxOption>
              </Combobox>
            </DesignSystemProvider>
          </Box>
        )}

        {!visible && (
          <Box padding={4} background="neutral150" borderRadius="4px" border="1px solid" borderColor="neutral200">
            <Typography variant="omega" color="neutral600">
              Nested provider unmounted. Check if the "Global Context Check" box above still
              has proper styling.
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
          import { DesignSystemProvider, Combobox, ComboboxOption } from '@strapi/design-system';
          import { useTheme } from 'styled-components';

          const Example = () => {
            const [visible, setVisible] = React.useState(true);
            const theme = useTheme();

            return (
              <>
                <Button variant="secondary" onClick={() => setVisible((v) => !v)}>
                  {visible ? 'Unmount nested DesignSystemProvider' : 'Mount nested DesignSystemProvider'}
                </Button>

                {visible && (
                  <DesignSystemProvider theme={theme}>
                    <Combobox label="My Item">
                      <ComboboxOption value="1">Item 1</ComboboxOption>
                      <ComboboxOption value="2">Item 2</ComboboxOption>
                      <ComboboxOption value="3">Item 3</ComboboxOption>
                    </Combobox>
                  </DesignSystemProvider>
                )}
              </>
            );
          };
        `,
      },
    },
  },
  name: 'Nested DesignSystemProvider with Combobox',
};

