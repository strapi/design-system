import { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab, TabGroup, TabPanel, TabPanels, Box } from '@strapi/design-system';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Components/Tabs',
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Base = {
  render: () => (
    <Box padding={8} background="primary100">
      <TabGroup label="Some stuff for the label" id="tabs" onTabChange={(selected) => console.log(selected)}>
        <Tabs>
          <Tab>First</Tab>
          <Tab>Second</Tab>
          <Tab>Third</Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              First panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Second panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Third panel
            </Box>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const Simple = {
  render: () => (
    <Box padding={8} background="neutral0">
      <TabGroup label="Some stuff for the label" id="tabs" variant="simple">
        <Tabs>
          <Tab>First</Tab>
          <Tab hasError>Second</Tab>
          <Tab>Third</Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              First panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Second panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Third panel
            </Box>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Box>
  ),

  name: 'simple',
} satisfies Story;

export const Disabled = {
  render: () => (
    <Box padding={8} background="neutral0">
      <TabGroup label="Some stuff for the label" id="tabs" variant="simple">
        <Tabs>
          <Tab disabled>First</Tab>
          <Tab>Second</Tab>
          <Tab disabled>Third</Tab>
          <Tab>Fourth</Tab>
          <Tab disabled>Fifth</Tab>
          <Tab>Sixth</Tab>
          <Tab disabled>Seventh</Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              First panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Second panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Third panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Fourth panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Fifth panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Sixth panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Seventh panel
            </Box>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Box>
  ),

  name: 'disabled',
} satisfies Story;

export const Selected = {
  render: () => (
    <Box padding={8} background="neutral0">
      <TabGroup label="Some stuff for the label" id="tabs" variant="simple" initialSelectedTabIndex={1}>
        <Tabs>
          <Tab>First</Tab>
          <Tab>Second</Tab>
          <Tab>Third</Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              First panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Second panel
            </Box>
          </TabPanel>
          <TabPanel>
            <Box color="neutral800" padding={4} background="neutral0">
              Third panel
            </Box>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Box>
  ),

  name: 'selected',
} satisfies Story;
