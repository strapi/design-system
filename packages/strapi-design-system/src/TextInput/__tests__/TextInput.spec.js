import * as React from 'react';
import { render } from '@testing-library/react';
import { TextInput } from '../TextInput';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('uuid', () => ({
  v4: () => 1,
}));

describe('TextInput', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TextInput
          placeholder="This is a content placeholder"
          label="Content"
          name="content"
          hint="Description line"
          error={undefined}
          onChange={(e) => {}}
          value={'content'}
          labelAction={<span>Hello world</span>}
        />
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
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c7::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c7::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c7:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c7::placeholder {
        color: #8e8ea9;
        opacity: 1;
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
                for="field-1"
              >
                Content
              </label>
              <div
                class="c4"
              >
                <span>
                  Hello world
                </span>
              </div>
            </div>
            <div
              class="c5 c6"
            >
              <input
                aria-describedby="field-hint-1"
                aria-invalid="false"
                class="c7"
                id="field-1"
                name="content"
                placeholder="This is a content placeholder"
                value="content"
              />
            </div>
            <p
              class="c8"
              id="field-hint-1"
            >
              Description line
            </p>
          </div>
        </div>
      </div>
    `);
  });
});
