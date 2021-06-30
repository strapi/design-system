import * as React from 'react';
import { render } from '@testing-library/react';
import { Accordion } from '../Accordion';
import { AccordionContent } from '../AccordionContent';
import { AccordionToggle } from '../AccordionToggle';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Accordion', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Accordion expanded={true} toggle={() => {}} id="accordion">
          <AccordionToggle
            title="User informations"
            description="The following contains information about the current user"
          />
          <AccordionContent>My name is John Duff</AccordionContent>
        </Accordion>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c7 {
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.25;
        color: #4945ff;
      }

      .c8 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c1 {
        border-radius: 4px;
      }

      .c3 {
        background: #f0f0ff;
        padding: 24px;
        border-radius: 4px;
      }

      .c6 {
        padding-right: 24px;
      }

      .c10 {
        background: #d9d8ff;
      }

      .c11 {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      .c11 svg {
        height: 0.375rem;
        width: 0.6875rem;
      }

      .c11 svg path {
        fill: #4945ff;
      }

      .c2 {
        border: 1px solid #4945ff;
        overflow: hidden;
      }

      .c2:hover {
        border: 1px solid #4945ff;
      }

      .c2:hover > .c0 {
        background: #f0f0ff;
      }

      .c2:hover .c9 {
        background: #d9d8ff;
      }

      .c2:hover .c9 svg path {
        fill: #4945ff;
      }

      .c5 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c4 {
        border: none;
        background: transparent;
        display: block;
        width: 100%;
        text-align: unset;
        padding: 0;
      }

      <div
        class="c0 c1 c2"
      >
        <div
          class="c0 c3"
        >
          <button
            aria-controls="accordion-content-accordion"
            aria-expanded="true"
            aria-labelledby="accordion-label-accordion"
            class="c4"
            data-strapi-accordion-toggle="true"
          >
            <div
              class="c5"
            >
              <div
                class="c0 c6"
              >
                <span
                  class="c7"
                  id="accordion-label-accordion"
                >
                  User informations
                </span>
                <p
                  class="c8"
                  id="accordion-desc-accordion"
                >
                  The following contains information about the current user
                </p>
              </div>
              <span
                aria-hidden="true"
                class="c0 c9 c10 c11"
              >
                <svg
                  fill="none"
                  height="1em"
                  viewBox="0 0 14 8"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                    fill="#32324D"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </button>
        </div>
        <div
          aria-describedby="accordion-desc-accordion"
          aria-labelledby="accordion-label-accordion"
          id="accordion-content-accordion"
          role="region"
        >
          My name is John Duff
        </div>
      </div>
    `);
  });
});
