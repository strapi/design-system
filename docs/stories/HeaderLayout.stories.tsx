import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  BaseHeaderLayout,
  HeaderLayout,
  ModalLayout,
  Link,
  Breadcrumbs,
  Crumb,
  Button,
  Box,
  VisuallyHidden,
} from '@strapi/design-system';
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';

const meta: Meta<typeof HeaderLayout> = {
  title: 'Design System/Components/HeaderLayout',
  component: HeaderLayout,
};

export default meta;

type Story = StoryObj<typeof HeaderLayout>;

export const Base = {
  render: () => (
    <Box background="neutral100">
      <BaseHeaderLayout
        navigationAction={
          <Link startIcon={<ArrowLeft />} href="/">
            Go back
          </Link>
        }
        primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>}
        secondaryAction={
          <Button variant="tertiary" startIcon={<Pencil />}>
            Edit
          </Button>
        }
        title="Restaurants"
        subtitle="36 entries found"
        as="h2"
      />
    </Box>
  ),

  name: 'base',
} satisfies Story;

export const BaseWithoutNavAction = {
  render: () => (
    <Box background="neutral100">
      <BaseHeaderLayout
        primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>}
        secondaryAction={
          <Button variant="tertiary" startIcon={<Pencil />}>
            Edit
          </Button>
        }
        title="Other CT"
        subtitle="36 entries found"
        as="h2"
      />
    </Box>
  ),

  name: 'base without nav action',
} satisfies Story;

export const BaseWithCustomSubtitle = {
  render: () => (
    <Box background="neutral100">
      <BaseHeaderLayout
        title="Media Library"
        subtitle={
          <Breadcrumbs label="folders">
            <Crumb>Animals</Crumb>
            <Crumb>Cats</Crumb>
          </Breadcrumbs>
        }
        as="h2"
      />
    </Box>
  ),

  name: 'base with custom subtitle',
} satisfies Story;

export const Sticky = {
  render: () => (
    <Box background="neutral100">
      <BaseHeaderLayout
        sticky
        navigationAction={
          <Link startIcon={<ArrowLeft />} href="/">
            <VisuallyHidden>Go back</VisuallyHidden>
          </Link>
        }
        primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>}
        secondaryAction={
          <Button variant="tertiary" startIcon={<Pencil />}>
            Edit
          </Button>
        }
        title="Restaurants"
        subtitle="36 entries found"
        as="h2"
      />
    </Box>
  ),

  name: 'sticky',
} satisfies Story;

export const CombinedWScroll = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <Box
        background="neutral100"
        style={{
          height: 2000,
        }}
      >
        <HeaderLayout
          navigationAction={
            <Link startIcon={<ArrowLeft />} href="/">
              Go back
            </Link>
          }
          primaryAction={
            <Button startIcon={<Plus />} onClick={() => setIsVisible(true)}>
              Add an entry
            </Button>
          }
          secondaryAction={
            <Button variant="tertiary" startIcon={<Pencil />}>
              Edit
            </Button>
          }
          title="Restaurants"
          subtitle="36 entries found"
          as="h2"
        />
        {isVisible && (
          <ModalLayout onClose={() => setIsVisible(false)} labelledBy="subtitle">
            <button onClick={() => setIsVisible(false)}>Close me</button>
            <h2 id="subtitle">Here we are</h2>
          </ModalLayout>
        )}
      </Box>
    );
  },

  name: 'combined w/ scroll',

  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;
