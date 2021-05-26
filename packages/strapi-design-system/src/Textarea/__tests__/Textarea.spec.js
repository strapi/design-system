import * as React from 'react';
import { render } from '@testing-library/react';
import { Textarea } from '../Textarea';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('uuid', () => ({
  v4: () => 1,
}));

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
          labelAction={<span>Some action</span>}
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

      .c6 {
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

      .c4 {
        padding-left: 4px;
      }

      .c5 {
        display: block;
        width: 100%;
        border: 1px solid #dcdce4;
        border-radius: 4px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        font-weight: 400;
        font-size: 0.875rem;
        color: #32324d;
        background: #ffffff;
        outline: none;
      }

      .c5:focus {
        border: 1px solid #4945ff;
      }

      .c5::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5::placeholder {
        color: #8e8ea9;
        opacity: 1;
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
        line-height: 1.25rem;
        font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans', 'Helvetica Neue',sans-serif;
      }

      .c0 textarea::-webkit-input-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c0 textarea::-moz-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c0 textarea:-ms-input-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c0 textarea::placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
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
                for="field-1"
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
            <textarea
              aria-describedby="field-hint-1"
              aria-invalid="false"
              class="c5"
              id="field-1"
              name="content"
              placeholder="This is a content placeholder"
            >
              Some content
            </textarea>
            <p
              class="c6"
              id="field-hint-1"
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
          labelAction={<span>Some action</span>}
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

      .c6 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #d02b20;
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

      .c4 {
        padding-left: 4px;
      }

      .c5 {
        display: block;
        width: 100%;
        border: 1px solid #d02b20;
        border-radius: 4px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        font-weight: 400;
        font-size: 0.875rem;
        color: #32324d;
        background: #ffffff;
        outline: none;
      }

      .c5:focus {
        border: 1px solid #4945ff;
      }

      .c5::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5::placeholder {
        color: #8e8ea9;
        opacity: 1;
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
        line-height: 1.25rem;
        font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans', 'Helvetica Neue',sans-serif;
      }

      .c0 textarea::-webkit-input-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c0 textarea::-moz-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c0 textarea:-ms-input-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c0 textarea::placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
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
                for="field-1"
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
            <textarea
              aria-describedby="field-error-1"
              aria-invalid="true"
              class="c5"
              id="field-1"
              name="content"
              placeholder="This is a content placeholder"
            >
              Some content
            </textarea>
            <p
              class="c6"
              id="field-error-1"
            >
              An error occured
            </p>
          </div>
        </div>
      </div>
    `);
  });
});
