import { Meta, StoryObj } from '@storybook/react';
import { Avatar, Initials, AvatarGroup, Box } from '@strapi/design-system';

const meta: Meta<typeof Avatar> = {
  title: 'Design System/Components/Avatar',
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Base = {
  render: () => (
    <Box padding={11}>
      <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" preview />
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const Group = {
  render: () => (
    <Box padding={11}>
      <AvatarGroup>
        <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" preview />
        <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" preview />
        <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" preview />
      </AvatarGroup>
    </Box>
  ),

  name: 'group',
} satisfies Story;

export const UserInitials = {
  render: () => (
    <Box padding={11}>
      <Initials>MF</Initials>
      <Initials background="secondary100" textColor="secondary600">
        MC
      </Initials>
    </Box>
  ),

  name: 'initials',
} satisfies Story;
