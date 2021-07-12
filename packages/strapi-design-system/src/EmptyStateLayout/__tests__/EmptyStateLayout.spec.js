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
      .c5 {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25;
        color: #666687;
      }

      .c10 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c11 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c2 {
        padding-bottom: 24px;
      }

      .c4 {
        padding-bottom: 16px;
      }

      .c8 {
        padding-right: 8px;
      }

      .c0 {
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

      .c3 svg {
        height: 5.5rem;
      }

      .c6 {
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

      .c6 svg {
        height: 12px;
        width: 12px;
      }

      .c6 svg > g,
      .c6 svg path {
        fill: #ffffff;
      }

      .c6[aria-disabled='true'] {
        pointer-events: none;
      }

      .c7 {
        padding: 8px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #d9d8ff;
        background: #f0f0ff;
      }

      .c7 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 1px;
      }

      .c7 .c9 {
        color: #ffffff;
      }

      .c7[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c7[aria-disabled='true'] .c9 {
        color: #666687;
      }

      .c7[aria-disabled='true'] svg > g,
      .c7[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c7[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c7[aria-disabled='true']:active .c9 {
        color: #666687;
      }

      .c7[aria-disabled='true']:active svg > g,
      .c7[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c7:hover {
        background-color: #ffffff;
      }

      .c7:active {
        background-color: #ffffff;
        border: 1px solid #4945ff;
      }

      .c7:active .c9 {
        color: #4945ff;
      }

      .c7:active svg > g,
      .c7:active svg path {
        fill: #4945ff;
      }

      .c7 .c9 {
        color: #271fe0;
      }

      .c7 svg > g,
      .c7 svg path {
        fill: #271fe0;
      }

      <div
        class="c0"
      >
        <div
          aria-hidden="true"
          class="c1 c2 c3"
        >
          <span>
            Icon
          </span>
        </div>
        <div
          class="c1 c4"
        >
          <p
            class="c5"
          >
            You don't have any content yet...
          </p>
        </div>
        <button
          aria-disabled="false"
          class="c6 c7"
        >
          <div
            aria-hidden="true"
            class="c1 c8"
          >
            <span>
              icon
            </span>
          </div>
          <span
            class="c9 c10 c11"
          >
            Create your first content-type
          </span>
        </button>
      </div>
    `);
  });
});
