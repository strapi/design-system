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
      .c2 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c7 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c1 {
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

      .c4 {
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

      .c3 {
        padding-left: 4px;
      }

      .c6 {
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

      .c6::-webkit-input-placeholder {
        color: #8e8ea9;
      }

      .c6::-moz-placeholder {
        color: #8e8ea9;
      }

      .c6:-ms-input-placeholder {
        color: #8e8ea9;
      }

      .c6::placeholder {
        color: #8e8ea9;
      }

      .c6:disabled {
        background: inherit;
        color: inherit;
      }

      .c6:focus {
        outline: none;
      }

      .c5 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c5:focus-within {
        border: 1px solid #4945ff;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      <div>
        <div
          class="c0"
        >
          <div
            class="c1"
          >
            <label
              class="c2"
              for="field-69a00500-c0d2-4ca9-8cfe-7139085329ea"
            >
              Content
            </label>
            <div
              class="c3"
            >
              <span>
                Some action
              </span>
            </div>
          </div>
          <div
            class="c4 c5"
          >
            <textarea
              aria-describedby="field-hint-69a00500-c0d2-4ca9-8cfe-7139085329ea"
              aria-invalid="false"
              class="c6"
              id="field-69a00500-c0d2-4ca9-8cfe-7139085329ea"
              name="content"
              placeholder="This is a content placeholder"
            >
              Some content
            </textarea>
          </div>
          <p
            class="c7"
            id="field-hint-69a00500-c0d2-4ca9-8cfe-7139085329ea"
          >
            Description line
          </p>
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
      .c2 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c7 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #dd2b23;
      }

      .c1 {
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

      .c4 {
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

      .c3 {
        padding-left: 4px;
      }

      .c6 {
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

      .c6::-webkit-input-placeholder {
        color: #8e8ea9;
      }

      .c6::-moz-placeholder {
        color: #8e8ea9;
      }

      .c6:-ms-input-placeholder {
        color: #8e8ea9;
      }

      .c6::placeholder {
        color: #8e8ea9;
      }

      .c6:disabled {
        background: inherit;
        color: inherit;
      }

      .c6:focus {
        outline: none;
      }

      .c5 {
        border: 1px solid #dd2b23;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c5:focus-within {
        border: 1px solid #4945ff;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      <div>
        <div
          class="c0"
        >
          <div
            class="c1"
          >
            <label
              class="c2"
              for="field-943c4188-c1f4-44ba-b0f0-bcc23c60b2b7"
            >
              Content
            </label>
            <div
              class="c3"
            >
              <span>
                Some action
              </span>
            </div>
          </div>
          <div
            class="c4 c5"
          >
            <textarea
              aria-describedby="field-error-943c4188-c1f4-44ba-b0f0-bcc23c60b2b7"
              aria-invalid="true"
              class="c6"
              id="field-943c4188-c1f4-44ba-b0f0-bcc23c60b2b7"
              name="content"
              placeholder="This is a content placeholder"
            >
              Some content
            </textarea>
          </div>
          <p
            class="c7"
            id="field-error-943c4188-c1f4-44ba-b0f0-bcc23c60b2b7"
          >
            An error occured
          </p>
        </div>
      </div>
    `);
  });
});
