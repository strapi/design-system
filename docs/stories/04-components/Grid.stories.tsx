import { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, Typography } from '@strapi/design-system';
import { outdent } from 'outdent';

const meta: Meta<typeof Grid.Root> = {
  title: 'Components/Grid',
  component: Grid.Root,
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Base = {
  render: () => (
    <Grid.Root gap={5}>
      <Grid.Item xs={1} background="primary100">
        <Typography>First</Typography>
      </Grid.Item>
      <Grid.Item xs={1} background="primary100">
        <Typography>Second</Typography>
      </Grid.Item>
      <Grid.Item xs={1} background="primary100">
        <Typography>Third</Typography>
      </Grid.Item>
      <Grid.Item xs={1} background="primary100" color="primary700">
        <Typography>Last</Typography>
      </Grid.Item>
    </Grid.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Grid.Root gap={5}>
          <Grid.Item xs={1} background="primary100">
            <Typography>First</Typography>
          </Grid.Item>
          <Grid.Item xs={1} background="primary100">
            <Typography>Second</Typography>
          </Grid.Item>
          <Grid.Item xs={1} background="primary100">
            <Typography>Third</Typography>
          </Grid.Item>
          <Grid.Item xs={1} background="primary100" color="primary700">
            <Typography>Last</Typography>
          </Grid.Item>
        </Grid.Root>
        `,
      },
    },
  },
  name: 'base',
} satisfies Story;

export const BaseGrid = {
  render: () => (
    <Grid.Root gap={5}>
      {Array(12)
        .fill(null)
        .map((_, i) => (
          <Grid.Item key={i} background="warning200" xs={1}>
            <Typography>{i + 1}</Typography>
          </Grid.Item>
        ))}
    </Grid.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Grid.Root gap={5}>
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <Grid.Item key={i} background="warning200" xs={1}>
                <Typography>{i + 1}</Typography>
              </Grid.Item>
            ))}
        </Grid.Root>
        `,
      },
    },
  },
  name: 'base grid',
} satisfies Story;

export const ReorderedGridItems = {
  render: () => (
    <Grid.Root gap={5}>
      <Grid.Item background="info200" col={4} order={{ initial: 3, medium: 1, large: 1 }}>
        <Typography>First</Typography>
      </Grid.Item>
      <Grid.Item background="info200" col={4} order={{ initial: 1, medium: 2, large: 3 }}>
        <Typography>Second</Typography>
      </Grid.Item>
      <Grid.Item background="info200" col={4} order={{ initial: 2, medium: 3, large: 2 }}>
        <Typography>Third</Typography>
      </Grid.Item>
    </Grid.Root>
  ),
  name: 'Reordered grid items',
} satisfies Story;

export const GridItemColSizeFallback = {
  render: () => (
    <Grid.Root gap={5}>
      {Array(12)
        .fill(null)
        .map((_, i) => (
          <Grid.Item key={i} background="success200" col={6}>
            <Typography>Column {i + 1}</Typography>
          </Grid.Item>
        ))}
    </Grid.Root>
  ),
  name: 'Column size fallback to col',
} satisfies Story;

export const ComplexGrid = {
  render: () => (
    <Grid.Root
      gap={{
        large: 5,
        medium: 2,
        initial: 1,
      }}
      background="primary200"
    >
      <Grid.Item background="neutral100" padding={{ initial: 1, medium: 4 }} col={6} s={12}>
        <Typography>Some box 1</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={1} col={6} s={12}>
        <Typography>Some box 2</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 3</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 4</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 5</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
        <Typography>Some box 6</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={1} col={8} xs={12}>
        <Typography>Some box 7</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={1} col={2} xs={12}>
        <Typography>Some box 8</Typography>
      </Grid.Item>
      <Grid.Item background="neutral100" padding={5} col={2} xs={12}>
        <Typography>Some box 9</Typography>
      </Grid.Item>
    </Grid.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: outdent`
        <Grid.Root
          gap={{
            large: 5,
            medium: 2,
            initial: 1,
          }}
          background="primary200"
        >
          <Grid.Item background="neutral100" padding={{ initial: 1, medium: 4 }} col={6} s={12}>
            <Typography>Some box 1</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={1} col={6} s={12}>
            <Typography>Some box 2</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
            <Typography>Some box 3</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
            <Typography>Some box 4</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
            <Typography>Some box 5</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={1} col={3} s={6} xs={12}>
            <Typography>Some box 6</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={1} col={8} xs={12}>
            <Typography>Some box 7</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={1} col={2} xs={12}>
            <Typography>Some box 8</Typography>
          </Grid.Item>
          <Grid.Item background="neutral100" padding={5} col={2} xs={12}>
            <Typography>Some box 9</Typography>
          </Grid.Item>
        </Grid.Root>
        `,
      },
    },
  },
  name: 'complex grid',
} satisfies Story;
