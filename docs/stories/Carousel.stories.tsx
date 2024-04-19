import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { CarouselInput, CarouselSlide, CarouselImage, CarouselActions, IconButton } from '@strapi/design-system';
import { Pencil, Play, Trash, Plus } from '@strapi/icons';

const meta: Meta<typeof CarouselInput> = {
  title: 'Design System/Components/CarouselInput',
  component: CarouselInput,
};

export default meta;

type Story = StoryObj<typeof CarouselInput>;

export const Base = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleNext = () => {
      setSelectedIndex((current) => (current < 2 ? current + 1 : 0));
    };

    const handlePrevious = () => {
      setSelectedIndex((current) => (current > 0 ? current - 1 : 2));
    };

    return (
      <CarouselInput
        label={`Carousel of numbers (${selectedIndex + 1}/3)`}
        selectedSlide={selectedIndex}
        secondaryLabel="/packages/strapi-design-system/src/Carousel/story-assets/first.jpg"
        previousLabel="Previous slide"
        nextLabel="Next slide"
        onNext={handleNext}
        onPrevious={handlePrevious}
        hint="Description line"
        actions={
          <CarouselActions>
            <IconButton onClick={() => console.log('edit')} label="Edit" id="edit" icon={<Pencil />} />
            <IconButton onClick={() => console.log('Create')} label="Create" icon={<Plus />} />
            <IconButton onClick={() => console.log('Delete')} label="Delete" icon={<Trash />} />
            <IconButton onClick={() => console.log('Publish')} label="Publish" icon={<Play />} />
          </CarouselActions>
        }
        style={{
          width: '242px',
        }}
      >
        <CarouselSlide label="1 of 3 slides">
          <CarouselImage src={'/stories/carousel/first.jpg'} alt="First" />
        </CarouselSlide>
        <CarouselSlide label="2 of 3 slides">
          <CarouselImage src={'/stories/carousel/second.png'} alt="second" />
        </CarouselSlide>
        <CarouselSlide label="3 of 3 slides">
          <CarouselImage src={'/stories/carousel/third.png'} alt="third" />
        </CarouselSlide>
      </CarouselInput>
    );
  },

  name: 'base',
} satisfies Story;

export const OneSlideOnly = {
  render: () => {
    return (
      <CarouselInput
        label="Carousel of numbers 1/1)"
        selectedSlide={0}
        previousLabel="Previous slide"
        nextLabel="Next slide"
        hint="Description line"
        actions={
          <CarouselActions>
            <IconButton onClick={() => console.log('edit')} label="Edit" id="edit" icon={<Pencil />} />
            <IconButton onClick={() => console.log('Create')} label="Create" icon={<Plus />} />
            <IconButton onClick={() => console.log('Delete')} label="Delete" icon={<Trash />} />
            <IconButton onClick={() => console.log('Publish')} label="Publish" icon={<Play />} />
          </CarouselActions>
        }
        style={{
          width: '242px',
        }}
      >
        <CarouselSlide label="1 of 1 slides">
          <CarouselImage src={'/stories/carousel/first.jpg'} alt="First" />
        </CarouselSlide>
      </CarouselInput>
    );
  },

  name: 'one slide only',
} satisfies Story;

export const BrokenAsset = {
  render: () => {
    return (
      <CarouselInput
        label="Carousel of numbers 1/1)"
        selectedSlide={0}
        previousLabel="Previous slide"
        nextLabel="Next slide"
        hint="Description line"
        actions={
          <CarouselActions>
            <IconButton onClick={() => console.log('edit')} label="Edit" id="edit" icon={<Pencil />} />
            <IconButton onClick={() => console.log('Create')} label="Create" icon={<Plus />} />
            <IconButton onClick={() => console.log('Delete')} label="Delete" icon={<Trash />} />
            <IconButton onClick={() => console.log('Publish')} label="Publish" icon={<Play />} />
          </CarouselActions>
        }
        style={{
          width: '242px',
        }}
      >
        <CarouselSlide label="1 of 1 slides">
          <CarouselImage src="asdf" alt="my image" />
        </CarouselSlide>
      </CarouselInput>
    );
  },

  name: 'broken-asset',
} satisfies Story;
