import { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Card,
  CardContent,
  CardAsset,
  CardBadge,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardHeader,
  CardAction,
  CardCheckbox,
  CardTimer,
  IconButton,
  KeyboardNavigable,
} from '@strapi/design-system';
import { Pencil } from '@strapi/icons';

const meta: Meta<typeof Card> = {
  title: 'Design System/Components/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Base = {
  render: () => (
    <Card
      style={{
        width: '240px',
      }}
      id="first"
    >
      <CardHeader>
        <CardCheckbox value />
        {/* @ts-expect-error – fix this */}
        <CardAction position="end">
          <IconButton label="Edit the thing" icon={<Pencil />} />
        </CardAction>
        <CardAsset src={'/stories/carousel/first.jpg'} />
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

  name: 'base',
} satisfies Story;

export const WithoutAssetAction = {
  render: () => (
    <Card
      style={{
        width: '240px',
      }}
      id="second"
    >
      <CardHeader>
        <CardCheckbox value />
        <CardAsset src={'/stories/carousel/first.jpg'} />
        <CardTimer>05:39</CardTimer>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>File name</CardTitle>
          <CardSubtitle>PNG - 400✕400</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>
  ),

  name: 'without asset action',
} satisfies Story;

export const WithAssetIcon = {
  render: () => (
    <Card
      style={{
        width: '240px',
      }}
      id="second"
    >
      <CardHeader>
        <CardCheckbox value />
        <CardAsset>
          <Pencil aria-label="Just a picture" />
        </CardAsset>
        <CardTimer>05:39</CardTimer>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>File name</CardTitle>
          <CardSubtitle>PNG - 400✕400</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>
  ),

  name: 'with asset icon',
} satisfies Story;

export const WithoutAssetActionNorTimer = {
  render: () => (
    <Card
      style={{
        width: '240px',
      }}
      id="third"
    >
      <CardHeader>
        <CardCheckbox value />
        <CardAsset src={'/stories/carousel/first.jpg'} />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>File name</CardTitle>
          <CardSubtitle>PNG - 400✕400</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>
  ),

  name: 'without asset action nor timer',
} satisfies Story;

export const WithoutAsset = {
  render: () => (
    <Card
      style={{
        width: '240px',
      }}
      id="fourth"
    >
      <CardBody>
        <Box padding={2} background="primary100">
          <Pencil />
        </Box>
        <CardContent paddingLeft={2}>
          <CardTitle>File name</CardTitle>
          <CardSubtitle>PNG - 400✕400</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>
  ),

  name: 'without asset',
} satisfies Story;

export const Keyboard = {
  render: () => (
    <KeyboardNavigable tagName="article">
      {['first', 'second', 'third', 'fourth'].map((id) => (
        <Card
          style={{
            width: '240px',
          }}
          id={id}
          key={id}
        >
          <CardBody>
            <Box padding={2} background="primary100">
              <Pencil />
            </Box>
            <CardContent paddingLeft={2}>
              <CardTitle>File name</CardTitle>
              <CardSubtitle>PNG - 400✕400</CardSubtitle>
            </CardContent>
            <CardBadge>Doc</CardBadge>
          </CardBody>
        </Card>
      ))}
    </KeyboardNavigable>
  ),

  name: 'keyboard navigable',
} satisfies Story;
