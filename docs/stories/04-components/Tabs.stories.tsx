import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box, Button, Field, Flex, Grid, GridItem, Tabs, Typography } from '@strapi/design-system';
import { outdent } from 'outdent';

interface TabsArgs extends Tabs.Props {}

const meta: Meta<TabsArgs> = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  TypeTable: {
    variant: {
      control: 'radio',
      options: ['regular', 'simple'],
    },
  },
  args: {
    disabled: 'expert',
    onValueChange: fn(),
    variant: 'regular',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root disabled="expert" defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
            <Tabs.Trigger value="expert">Expert</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">The default settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">The advanced settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Regex</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    return (
      <Tabs.Root {...args} defaultValue="base">
        <Tabs.List aria-label="Manage your attribute">
          <Tabs.Trigger value="base">Base</Tabs.Trigger>
          <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
          <Tabs.Trigger value="expert">Expert</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="base">
          <Box padding={4}>
            <Typography tag="p">The default settings for your attribute</Typography>
            <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
              <GridItem col={1}>
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Field.Input />
                </Field.Root>
              </GridItem>
              <GridItem col={1}>
                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Field.Input />
                </Field.Root>
              </GridItem>
            </Grid>
            <Flex marginTop={5} justifyContent="flex-end">
              <Button>Save</Button>
            </Flex>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="advanced">
          <Box padding={4}>
            <Typography tag="p">The advanced settings for your attribute</Typography>
            <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
              <GridItem col={1}>
                <Field.Root>
                  <Field.Label>Regex</Field.Label>
                  <Field.Input />
                </Field.Root>
              </GridItem>
            </Grid>
            <Flex marginTop={5} justifyContent="flex-end">
              <Button>Save</Button>
            </Flex>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    );
  },
};

export default meta;

type Story = StoryObj<TabsArgs>;

export const Base = {
  name: 'base',
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root disabled defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
            <Tabs.Trigger value="expert">Expert</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">The default settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">The advanced settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Regex</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
  },
  name: 'disabled',
} satisfies Story;

export const Controlled = {
  TypeTable: {
    value: {
      control: 'radio',
      options: ['base', 'advanced'],
    },
  },
  args: {
    value: 'advanced',
  },
  name: 'controlled',
} satisfies Story;

export const SimpleVariant = {
  args: {
    variant: 'simple',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root disabled="expert" variant="simple" defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
            <Tabs.Trigger value="expert">Expert</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">The default settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">The advanced settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Regex</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
  },
  name: 'simple variant',
} satisfies Story;

export const Error = {
  args: {
    hasError: 'advanced',
    variant: 'simple',
  },
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Tabs.Root disabled="expert" hasError="advanced" variant="simple" defaultValue="base">
          <Tabs.List aria-label="Manage your attribute">
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
            <Tabs.Trigger value="expert">Expert</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="base">
            <Box padding={4}>
              <Typography tag="p">The default settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="advanced">
            <Box padding={4}>
              <Typography tag="p">The advanced settings for your attribute</Typography>
              <Grid tag="fieldset" gap={4} padding="0px" gridCols={2} borderWidth={0} marginTop={2}>
                <GridItem col={1}>
                  <Field.Root>
                    <Field.Label>Regex</Field.Label>
                    <Field.Input />
                  </Field.Root>
                </GridItem>
              </Grid>
              <Flex marginTop={5} justifyContent="flex-end">
                <Button>Save</Button>
              </Flex>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
        `,
      },
    },
  },
  name: 'has error',
} satisfies Story;
