import { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, LinkButton } from '@strapi/design-system';
import { Feather, Information } from '@strapi/icons';

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
        <LinkButton size="S" href="/">
          Small
        </LinkButton>
      </Box>
      <LinkButton size="L" href="/">
        Large
      </LinkButton>
    </Flex>
  ),

  name: 'sizes',
} satisfies Story;

export const Variants = {
  render: () => (
    <Flex>
      {(['default', 'secondary', 'tertiary', 'success', 'danger', 'success-light', 'danger-light'] as const).map(
        (variant) => (
          <Box key={variant} paddingRight={2}>
            <LinkButton variant={variant} href="/">
              {variant}
            </LinkButton>
          </Box>
        ),
      )}
    </Flex>
  ),

  name: 'variants',
} satisfies Story;

export const Icons = {
  render: () => (
    <Flex>
      <Box paddingRight={1}>
        <LinkButton startIcon={<Information />} href="/">
          Information
        </LinkButton>
      </Box>
      <LinkButton variant="secondary" endIcon={<Feather />} href="/">
        Write content
      </LinkButton>
    </Flex>
  ),

  name: 'icons',
} satisfies Story;

export const Disabled = {
  render: () => (
    <Box paddingRight={1}>
      <LinkButton disabled href="/" startIcon={<Information />}>
        Information
      </LinkButton>
    </Box>
  ),

  name: 'disabled',
} satisfies Story;
