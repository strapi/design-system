import * as React from 'react';
import { render } from '@testing-library/react';
import { Carousel } from '../Carousel';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { CarouselSlide } from '../CarouselSlide';
import { CarouselImage } from '../CarouselImage';
import { CarouselActions } from '../CarouselActions';
import { IconButton } from '../../IconButton';

describe('Carousel', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Carousel
          label={`Carousel of numbers (2/3)`}
          selectedSlide={1}
          previousLabel="Previous slide"
          nextLabel="Next slide"
          onNext={() => {}}
          onPrevious={() => {}}
          actions={
            <CarouselActions>
              <IconButton onClick={() => console.log('edit')} title="Edit" id="edit">
                <span>First</span>
              </IconButton>
              <IconButton onClick={() => console.log('Create')} title="Create" id="create">
                <span>Second</span>
              </IconButton>
              <IconButton onClick={() => console.log('Delete')} title="Delete" id="delete">
                <span>Third</span>
              </IconButton>
              <IconButton onClick={() => console.log('Publish')} title="Publish" id="publish">
                <span>Fourth</span>
              </IconButton>
            </CarouselActions>
          }
          style={{ width: '242px' }}
        >
          <CarouselSlide label="1 of 3 slides">
            <CarouselImage src={'firstPathImg'} alt="First" />
          </CarouselSlide>
          <CarouselSlide label="2 of 3 slides">
            <CarouselImage src={'firstPathImg'} alt="second" />
          </CarouselSlide>
          <CarouselSlide label="3 of 3 slides">
            <CarouselImage src={'firstPathImg'} alt="third" />
          </CarouselSlide>
        </Carousel>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        padding-bottom: 4px;
      }

      .c2 {
        background: #f6f6f9;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #dcdce4;
      }

      .c6 {
        padding-right: 8px;
        padding-left: 8px;
      }

      .c1 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c3 {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-areas: 'startAction slides endAction';
        position: relative;
      }

      .c7 {
        width: 100%;
        grid-area: slides;
      }

      .c4 {
        grid-area: startAction;
      }

      .c4 svg {
        width: 0.375rem;
        height: 0.625rem;
      }

      .c5 {
        grid-area: endAction;
      }

      .c5 svg {
        width: 0.375rem;
        height: 0.625rem;
      }

      .c8 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c9 {
        display: none;
      }

      .c10 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c11 {
        position: absolute;
        width: 100%;
        bottom: 4px;
      }

      .c11 > * + * {
        margin-left: 4px;
      }

      .c12 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdce4;
      }

      .c12 svg {
        height: 12px;
        width: 12px;
      }

      .c12 svg > g,
      .c12 svg path {
        fill: #ffffff;
      }

      .c12[aria-disabled='true'] {
        pointer-events: none;
      }

      .c13 svg > g,
      .c13 svg path {
        fill: #8e8ea9;
      }

      .c13:hover svg > g,
      .c13:hover svg path {
        fill: #666687;
      }

      .c13:active svg > g,
      .c13:active svg path {
        fill: #a5a5ba;
      }

      <div
        style="width: 242px;"
      >
        <div
          class="c0"
        >
          <p
            class="c1"
          >
            Carousel of numbers (2/3)
          </p>
        </div>
        <div
          class="c2"
        >
          <section
            aria-label="Carousel of numbers (2/3)"
            aria-roledescription="carousel"
            class="c3"
          >
            <button
              aria-label="Previous slide"
              class="c4"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="1em"
                viewBox="0 0 10 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.88 14.12L3.773 8 9.88 1.88 8 0 0 8l8 8 1.88-1.88z"
                  fill="#32324D"
                />
              </svg>
            </button>
            <button
              aria-label="Next slide"
              class="c5"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="1em"
                viewBox="0 0 10 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.88L6.107 8 0 14.12 1.88 16l8-8-8-8L0 1.88z"
                  fill="#32324D"
                />
              </svg>
            </button>
            <div
              aria-live="polite"
              class="c6 c7"
            >
              <div
                aria-label="1 of 3 slides"
                aria-roledescription="slide"
                class="c8 c9"
                role="group"
              >
                <img
                  alt="First"
                  height="124px"
                  src="firstPathImg"
                />
              </div>
              <div
                aria-label="2 of 3 slides"
                aria-roledescription="slide"
                class="c8 c10"
                role="group"
              >
                <img
                  alt="second"
                  height="124px"
                  src="firstPathImg"
                />
              </div>
              <div
                aria-label="3 of 3 slides"
                aria-roledescription="slide"
                class="c8 c9"
                role="group"
              >
                <img
                  alt="third"
                  height="124px"
                  src="firstPathImg"
                />
              </div>
            </div>
            <div
              class="c8 c11"
            >
              <button
                aria-disabled="false"
                aria-labelledby="tooltip-1f2df813-151b-457e-a6ff-8d69863f0192"
                class="c12 c13"
                id="edit"
                tabindex="0"
              >
                <span>
                  First
                </span>
              </button>
              <button
                aria-disabled="false"
                aria-labelledby="tooltip-a2a12b79-2926-4ac8-ac6f-a7eed85881a4"
                class="c12 c13"
                id="create"
                tabindex="0"
              >
                <span>
                  Second
                </span>
              </button>
              <button
                aria-disabled="false"
                aria-labelledby="tooltip-b5143f1e-f8b4-4ca6-9d70-2d8f80f2d631"
                class="c12 c13"
                id="delete"
                tabindex="0"
              >
                <span>
                  Third
                </span>
              </button>
              <button
                aria-disabled="false"
                aria-labelledby="tooltip-242f5951-4b54-4fb7-99bc-66c4b4b41d4c"
                class="c12 c13"
                id="publish"
                tabindex="0"
              >
                <span>
                  Fourth
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    `);
  });
});
