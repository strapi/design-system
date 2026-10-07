import * as React from 'react';

import { render, screen } from '@test/utils';

import { Carousel, CarouselActions, CarouselInput, CarouselSlide } from './carousel-input';

const slides = [
  <CarouselSlide key="1" label="1 of 3 slides">
    First
  </CarouselSlide>,
  <CarouselSlide key="2" label="2 of 3 slides">
    Second
  </CarouselSlide>,
  <CarouselSlide key="3" label="3 of 3 slides">
    Third
  </CarouselSlide>,
];

describe('Carousel', () => {
  it('shows the selected slide only, in a named carousel', () => {
    render(
      <Carousel label="Images" previousLabel="Previous" nextLabel="Next" selectedSlide={1}>
        {slides}
      </Carousel>,
    );

    expect(screen.getByRole('region', { name: 'Images' })).toHaveAttribute('aria-roledescription', 'carousel');
    expect(screen.getByRole('group', { name: '2 of 3 slides' })).toBeVisible();
    expect(screen.queryByRole('group', { name: '1 of 3 slides' })).not.toBeInTheDocument();
  });

  it('calls onNext and onPrevious from the buttons and the arrow keys', async () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    const { user } = render(
      <Carousel
        label="Images"
        previousLabel="Previous"
        nextLabel="Next"
        selectedSlide={0}
        onNext={onNext}
        onPrevious={onPrevious}
      >
        {slides}
      </Carousel>,
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Previous' }));

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(1);

    await user.keyboard('{ArrowRight}');

    expect(onNext).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(onPrevious).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveFocus();
  });

  it('has no buttons with a single slide, and renders the actions and the secondary label', () => {
    render(
      <Carousel
        label="Images"
        previousLabel="Previous"
        nextLabel="Next"
        selectedSlide={0}
        secondaryLabel="image.png"
        actions={
          <CarouselActions>
            <button type="button">Edit</button>
          </CarouselActions>
        }
      >
        <CarouselSlide label="1 of 1 slide">Only</CarouselSlide>
      </Carousel>,
    );

    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByText('image.png')).toHaveAttribute('title', 'image.png');
  });
});

describe('CarouselInput', () => {
  it('renders the label, the required mark and the hint', () => {
    const { container } = render(
      <CarouselInput
        id="carousel"
        label="Media"
        hint="Upload images"
        required
        previousLabel="Previous"
        nextLabel="Next"
        selectedSlide={0}
      >
        {slides}
      </CarouselInput>,
    );

    expect(container.querySelector('label')).toHaveTextContent('Media*');
    expect(container.querySelector('label')).toHaveAttribute('for', 'carousel');
    expect(screen.getByText('Upload images')).toHaveAttribute('id', 'carousel-hint');
    expect(screen.getByRole('region', { name: 'Media' })).toBeInTheDocument();
  });

  it('replaces the hint by the error', () => {
    render(
      <CarouselInput
        id="carousel"
        label="Media"
        hint="Upload images"
        error="Required"
        previousLabel="Previous"
        nextLabel="Next"
        selectedSlide={0}
      >
        {slides}
      </CarouselInput>,
    );

    expect(screen.queryByText('Upload images')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toHaveAttribute('data-strapi-field-error');
  });

  it('forwards its ref to the carousel', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <CarouselInput ref={ref} label="Media" previousLabel="Previous" nextLabel="Next" selectedSlide={0}>
        {slides}
      </CarouselInput>,
    );

    expect(ref.current).toHaveAttribute('data-slot', 'carousel');
  });
});
