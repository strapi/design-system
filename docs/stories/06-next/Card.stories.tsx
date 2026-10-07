import { Meta, StoryObj } from '@storybook/react-vite';
import { Pencil } from '@strapi/icons';

import {
  Card,
  CardAction,
  CardAsset,
  CardBadge,
  CardBody,
  CardCheckbox,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTimer,
  CardTitle,
  IconButton,
} from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta<typeof Card> = {
  title: 'Next/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Base = {
  render: () => (
    <Card id="first" style={{ width: '24rem' }}>
      <CardHeader>
        <CardCheckbox />
        <CardAction position="end">
          <IconButton label="Edit the thing">
            <Pencil />
          </IconButton>
        </CardAction>
        <CardAsset src="/stories/carousel/first.jpg" />
        <CardTimer>05:39</CardTimer>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>File name fezof hzoeah fohzeofhozaehfohzeoafhzoaehfohzaeo fhozahf ozaehfoa</CardTitle>
          <CardSubtitle>PNG - 400✕400</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'base',
} satisfies Story;

export const SmallAsset = {
  render: () => (
    <Card style={{ width: '24rem' }}>
      <CardHeader>
        <CardAsset size="sm" src="/stories/carousel/second.png" />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>second.png</CardTitle>
          <CardSubtitle>PNG - 1200✕800</CardSubtitle>
        </CardContent>
        <CardBadge variant="secondary">Image</CardBadge>
      </CardBody>
    </Card>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'small asset',
} satisfies Story;

export const CustomAsset = {
  render: () => (
    <Card style={{ width: '24rem' }}>
      <CardHeader>
        <CardAsset>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '2.4rem',
              color: 'var(--neutral-600)',
            }}
          >
            PDF
          </div>
        </CardAsset>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>contract.pdf</CardTitle>
          <CardSubtitle>PDF - 2MB</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>
  ),
  name: 'custom asset',
} satisfies Story;
