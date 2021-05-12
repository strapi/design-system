import * as React from 'react';
import { render } from '@testing-library/react';
import { Textarea } from '../Textarea';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Textarea', () => {
  it('snapshots the component with a hint', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Textarea
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          onChange={() => {}}
          action={<span>Some action</span>}
        >
          Some content
        </Textarea>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c8 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
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
        padding-left: 4px;
      }

      .c7 {
        border: none;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
      }

      .c7::-webkit-input-placeholder {
        color: #8e8ea9;
      }

      .c7::-moz-placeholder {
        color: #8e8ea9;
      }

      .c7:-ms-input-placeholder {
        color: #8e8ea9;
      }

      .c7::placeholder {
        color: #8e8ea9;
      }

      .c7:disabled {
        background: inherit;
        color: inherit;
      }

      .c7:focus {
        outline: none;
      }

      .c6 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c6:focus-within {
        border: 1px solid #4945ff;
      }

      .c1 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c1 > * + * {
        margin-top: 4px;
      }

      .c0 textarea {
        height: 5rem;
      }

      <div
        class="c0"
      >
        <div>
          <div
            class="c1"
          >
            <div
              class="c2"
            >
              <label
                class="c3"
                for="field-674ac2e0-d5ab-4cef-a4a2-9604be53372a"
              >
                Content
              </label>
              <div
                class="c4"
              >
                <span>
                  Some action
                </span>
              </div>
            </div>
            <div
              class="c5 c6"
            >
              <textarea
                aria-describedby="field-hint-674ac2e0-d5ab-4cef-a4a2-9604be53372a"
                aria-invalid="false"
                class="c7"
                id="field-674ac2e0-d5ab-4cef-a4a2-9604be53372a"
                name="content"
                placeholder="This is a content placeholder"
              >
                Some content
              </textarea>
            </div>
            <p
              class="c8"
              id="field-hint-674ac2e0-d5ab-4cef-a4a2-9604be53372a"
            >
              Description line
            </p>
          </div>
        </div>
      </div>
    `);
  });

  it('snapshots the component with an error', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Textarea
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error="An error occured"
          onChange={() => {}}
          action={<span>Some action</span>}
        >
          Some content
        </Textarea>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c8 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #dd2b23;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
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
        padding-left: 4px;
      }

      .c7 {
        border: none;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
      }

      .c7::-webkit-input-placeholder {
        color: #8e8ea9;
      }

      .c7::-moz-placeholder {
        color: #8e8ea9;
      }

      .c7:-ms-input-placeholder {
        color: #8e8ea9;
      }

      .c7::placeholder {
        color: #8e8ea9;
      }

      .c7:disabled {
        background: inherit;
        color: inherit;
      }

      .c7:focus {
        outline: none;
      }

      .c6 {
        border: 1px solid #dd2b23;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c6:focus-within {
        border: 1px solid #4945ff;
      }

      .c1 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c1 > * + * {
        margin-top: 4px;
      }

      .c0 textarea {
        height: 5rem;
      }

      <div
        class="c0"
      >
        <div>
          <div
            class="c1"
          >
            <div
              class="c2"
            >
              <label
                class="c3"
                for="field-b0a5e4a9-5cdf-4a75-bdc6-0fa6f95b38be"
              >
                Content
              </label>
              <div
                class="c4"
              >
                <span>
                  Some action
                </span>
              </div>
            </div>
            <div
              class="c5 c6"
            >
              <textarea
                aria-describedby="field-error-b0a5e4a9-5cdf-4a75-bdc6-0fa6f95b38be"
                aria-invalid="true"
                class="c7"
                id="field-b0a5e4a9-5cdf-4a75-bdc6-0fa6f95b38be"
                name="content"
                placeholder="This is a content placeholder"
              >
                Some content
              </textarea>
            </div>
            <p
              class="c8"
              id="field-error-b0a5e4a9-5cdf-4a75-bdc6-0fa6f95b38be"
            >
              An error occured
            </p>
          </div>
        </div>
      </div>
    `);
  });
});
