import { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, LinkButton } from '@strapi/design-system';
import { Information, Write } from '@strapi/icons';

const meta: Meta<typeof LinkButton> = {
  title: 'Design System/Components/LinkButton',
  component: LinkButton,
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Base = {
  render: () => (
    <Box paddingBottom={2}>
      <LinkButton variant="default" isExternal href="https://strapi.io/">
        Default
      </LinkButton>
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const Sizes = {
  render: () => (
    <Flex>
      <Box paddingRight={1}>
        <LinkButton size="S" to="/">
          Small
        </LinkButton>
      </Box>
      <LinkButton size="L" to="/">
        Large
      </LinkButton>
    </Flex>
  ),

  name: 'sizes',
} satisfies Story;

export const Variants = {
  render: () => (
    <Flex>
      {['default', 'secondary', 'tertiary', 'success', 'danger', 'success-light', 'danger-light'].map((variant) => (
        <Box key={variant} paddingRight={2}>
          <LinkButton variant={variant} to="/">
            {variant}
          </LinkButton>
        </Box>
      ))}
    </Flex>
  ),

  name: 'variants',
} satisfies Story;

export const Icons = {
  render: () => (
    <Flex>
      <Box paddingRight={1}>
        <LinkButton startIcon={<Information />} to="/">
          Information
        </LinkButton>
      </Box>
      <LinkButton variant="secondary" endIcon={<Write />} to="/">
        Write content
      </LinkButton>
    </Flex>
  ),

  name: 'icons',
} satisfies Story;

export const Disabled = {
  render: () => (
    <Box paddingRight={1}>
      <LinkButton disabled to="/" startIcon={<Information />}>
        Information
      </LinkButton>
    </Box>
  ),

  name: 'disabled',
} satisfies Story;
