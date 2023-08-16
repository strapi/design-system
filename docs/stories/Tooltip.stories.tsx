import { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Grid as DSGrid, GridItem, Typography } from '@strapi/design-system';

const meta: Meta<typeof Tooltip> = {
  title: 'Design System/Components/Tooltip',
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Base = {
  render: () => (
    <div>
      <Typography>
        An infinite amount of content to place correctly the tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
      <Tooltip description="Content of the tooltip">
        <Typography>Show tooltip</Typography>
      </Tooltip>
      <Typography>
        An infinite amount of content to place correctly the tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
    </div>
  ),

  name: 'base',
} satisfies Story;

export const WithTextInside = {
  render: () => (
    <div>
      <Tooltip description="Smaller">
        <Typography>Show tooltip</Typography>
      </Tooltip>
    </div>
  ),

  name: 'with text inside',
} satisfies Story;

export const Grid = {
  render: () => (
    <DSGrid gap={4} padding={4}>
      <GridItem col={3}>
        <Tooltip description="Tootips are neat.">
          <button>
            <Typography>Default tooltip</Typography>
          </button>
        </Tooltip>
      </GridItem>
      <GridItem col={3}>
        <Tooltip description="Tootips are neat." position="bottom">
          <button>
            <Typography>Bottom</Typography>
          </button>
        </Tooltip>
      </GridItem>
      <GridItem col={3}>
        <Tooltip description="Tootips are neat." position="right">
          <button>
            <Typography>Right</Typography>
          </button>
        </Tooltip>
      </GridItem>
      <GridItem col={3}>
        <Tooltip description="Tootips are neat." position="left">
          <button>
            <Typography>Left</Typography>
          </button>
        </Tooltip>
      </GridItem>
    </DSGrid>
  ),

  name: 'grid',
} satisfies Story;
