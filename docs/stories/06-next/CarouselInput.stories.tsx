import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Pencil, Plus, Trash } from '@strapi/icons';

import { CarouselActions, CarouselImage, CarouselInput, CarouselSlide } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const IMAGES = [
  'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80',
  'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80',
  'https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80',
];

const ACTION_STYLE = {
  display: 'flex',
  padding: '0.7rem',
  borderRadius: '4px',
  border: '1px solid var(--neutral-200)',
  background: 'var(--neutral-0)',
  color: 'var(--neutral-500)',
  cursor: 'pointer',
};

const CarouselInputExample = (args: Partial<React.ComponentProps<typeof CarouselInput>>) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <div style={{ maxWidth: '30rem' }}>
      <CarouselInput
        label={`Carousel of images (${selected + 1}/${IMAGES.length})`}
        selectedSlide={selected}
        previousLabel="Previous slide"
        nextLabel="Next slide"
        onNext={() => setSelected((current) => (current < IMAGES.length - 1 ? current + 1 : 0))}
        onPrevious={() => setSelected((current) => (current > 0 ? current - 1 : IMAGES.length - 1))}
        hint="Description line"
        secondaryLabel="Strapi_logo.png"
        actions={
          <CarouselActions>
            <button type="button" aria-label="Create" style={ACTION_STYLE}>
              <Plus />
            </button>
            <button type="button" aria-label="Edit" style={ACTION_STYLE}>
              <Pencil />
            </button>
            <button type="button" aria-label="Delete" style={ACTION_STYLE}>
              <Trash />
            </button>
          </CarouselActions>
        }
        {...args}
      >
        {IMAGES.map((src, index) => (
          <CarouselSlide key={src} label={`${index + 1} of ${IMAGES.length} slides`}>
            <CarouselImage src={src} alt={`Image ${index + 1}`} />
          </CarouselSlide>
        ))}
      </CarouselInput>
    </div>
  );
};

const meta: Meta<typeof CarouselInputExample> = {
  title: 'Next/CarouselInput',
  component: CarouselInputExample,
  args: {
    required: false,
    error: undefined,
  },
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Adds a red asterisk to the label.',
    },
    error: {
      control: 'text',
      description: 'The error message. It replaces the hint.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CarouselInputExample>;

export const Base = {
  name: 'base',
} satisfies Story;

export const RequiredWithError = {
  args: {
    required: true,
    error: 'This field is required',
  },
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'required with error',
} satisfies Story;
