import { Meta, StoryObj } from '@storybook/react';
import { Icon, TextButton } from '@strapi/design-system';
import { ArrowLeft, ArrowRight } from '@strapi/icons';

const meta: Meta<typeof TextButton> = {
  title: 'Design System/Components/TextButton',
  component: TextButton,
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Base = {
  render: () => <TextButton>Click on me</TextButton>,

  name: 'base',
} satisfies Story;

export const Icons = {
  render: () => (
    <TextButton endIcon={<Icon as={ArrowRight} />} startIcon={<Icon as={ArrowLeft} />}>
      Click on me
    </TextButton>
  ),

  name: 'icons',
} satisfies Story;

export const Disabled = {
  render: () => (
    <TextButton disabled startIcon={<Icon as={ArrowLeft} />}>
      Disabled TextButton
    </TextButton>
  ),

  name: 'disabled',
} satisfies Story;

export const Loading = {
  render: () => (
    <TextButton loading startIcon={<Icon as={ArrowLeft} />}>
      Loading
    </TextButton>
  ),

  name: 'loading',
} satisfies Story;
