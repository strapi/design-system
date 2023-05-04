import { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem, Typography } from '@strapi/design-system';

const meta: Meta<typeof Grid> = {
  title: 'Design System/Technical Components/Grid',
  component: Grid,
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Base = {
  render: () => (
    <Grid gap={5}>
      <GridItem col={1} background="primary100">
        <Typography>First</Typography>
      </GridItem>
      <GridItem col={1} background="primary100">
        <Typography>Second</Typography>
      </GridItem>
      <GridItem col={1} background="primary100">
        <Typography>Third</Typography>
      </GridItem>
      <GridItem col={1} background="primary100" color="primary700">
        <Typography>Last</Typography>
      </GridItem>
    </Grid>
  ),

  name: 'base',
} satisfies Story;

export const BaseGrid = {
  render: () => (
    <Grid gap={5}>
      {Array(12)
        .fill(null)
        .map((_, i) => (
          <GridItem key={i} background="warning200" col={1}>
            <Typography>{i + 1}</Typography>
          </GridItem>
        ))}
    </Grid>
  ),

  name: 'base grid',
} satisfies Story;

export const ComplexGrid = {
  render: () => (
    <Grid
      gap={{
        desktop: 5,
        tablet: 2,
        mobile: 1,
      }}
      background="primary200"
    >
      <GridItem background="neutral100" padding={1} col={6} s={12}>
        <Typography>Some box 1</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={1} col={6} s={12}>
        <Typography>Some box 2</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 3</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 4</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 5</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 6</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={1} col={8} xs={12}>
        <Typography>Some box 7</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={1} col={2} xs={12}>
        <Typography>Some box 8</Typography>
      </GridItem>
      <GridItem background="neutral100" padding={5} col={2} xs={12}>
        <Typography>Some box 9</Typography>
      </GridItem>
    </Grid>
  ),

  name: 'complex grid',
} satisfies Story;
