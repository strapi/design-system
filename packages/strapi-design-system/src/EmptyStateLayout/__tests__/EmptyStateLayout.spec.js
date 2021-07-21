import * as React from 'react';
import { render } from '@testing-library/react';
import { EmptyStateLayout } from '../EmptyStateLayout';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Button } from '../../Button';

describe('EmptyStateLayout', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <EmptyStateLayout
          icon={<span>Icon</span>}
          content="You don't have any content yet..."
          action={
            <Button variant="secondary" startIcon={<span>icon</span>}>
              Create your first content-type
            </Button>
          }
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c6 {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25;
        color: #666687;
      }

      .c11 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c1 {
        background: #ffffff;
        padding-top: 56px;
        padding-bottom: 56px;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c3 {
        padding-bottom: 24px;
      }

      .c5 {
        padding-bottom: 16px;
      }

      .c9 {
        padding-right: 8px;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c4 svg {
        height: 5.5rem;
      }

      .c7 {
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

      .c7 svg {
        height: 12px;
        width: 12px;
      }

      .c7 svg > g,
      .c7 svg path {
        fill: #ffffff;
      }

      .c7[aria-disabled='true'] {
        pointer-events: none;
      }

      .c8 {
        padding: 8px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #d9d8ff;
        background: #f0f0ff;
      }

      .c8 .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 2px;
      }

      .c8 .c10 {
        color: #ffffff;
      }

      .c8[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c8[aria-disabled='true'] .c10 {
        color: #666687;
      }

      .c8[aria-disabled='true'] svg > g,
      .c8[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c8[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c8[aria-disabled='true']:active .c10 {
        color: #666687;
      }

      .c8[aria-disabled='true']:active svg > g,
      .c8[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c8:hover {
        background-color: #ffffff;
      }

      .c8:active {
        background-color: #ffffff;
        border: 1px solid #4945ff;
      }

      .c8:active .c10 {
        color: #4945ff;
      }

      .c8:active svg > g,
      .c8:active svg path {
        fill: #4945ff;
      }

      .c8 .c10 {
        color: #271fe0;
      }

      .c8 svg > g,
      .c8 svg path {
        fill: #271fe0;
      }

      <div
        class="c0 c1 c2"
      >
        <div
          aria-hidden="true"
          class="c0 c3 c4"
        >
          <span>
            Icon
          </span>
        </div>
        <div
          class="c0 c5"
        >
          <p
            class="c6"
          >
            You don't have any content yet...
          </p>
        </div>
        <button
          aria-disabled="false"
          class="c7 c8"
        >
          <div
            aria-hidden="true"
            class="c0 c9"
          >
            <span>
              icon
            </span>
          </div>
          <span
            class="c10 c11"
          >
            Create your first content-type
          </span>
        </button>
      </div>
    `);
  });
});
