import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Checkbox } from '../Checkbox';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Checkbox', () => {
  it('snapshots when the value is undefined (should have name=default)', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <Checkbox name="default" onValueChange={() => undefined} value={undefined} id={2}>
            Label
          </Checkbox>
        </div>
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByRole('checkbox').getAttribute('name')).toBe('default'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        margin: 0;
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
      }

      .c3:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:checked:after {
        content: '';
        display: block;
        position: relative;
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 10px;
        height: 10px;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c3:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:indeterminate:after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: #ffffff;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c4 {
        padding-left: 8px;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c2 * {
        cursor: default;
      }

      <div>
        <div>
          <div
            class="c0"
          >
            <label
              aria-invalid="false"
              class="c1 c2"
            >
              <input
                class="c3"
                id="field-2"
                name="default"
                type="checkbox"
              />
              <div
                class="c4"
              >
                Label
              </div>
            </label>
          </div>
        </div>
      </div>
    `);
  });

  it('snapshots when the checkbox is checked', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <Checkbox name="default-true" onValueChange={() => undefined} value={true} id={2}>
            Label
          </Checkbox>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        margin: 0;
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
      }

      .c3:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:checked:after {
        content: '';
        display: block;
        position: relative;
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 10px;
        height: 10px;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c3:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:indeterminate:after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: #ffffff;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c4 {
        padding-left: 8px;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c2 * {
        cursor: default;
      }

      <div>
        <div>
          <div
            class="c0"
          >
            <label
              aria-invalid="false"
              class="c1 c2"
            >
              <input
                checked=""
                class="c3"
                id="field-2"
                name="default-true"
                type="checkbox"
              />
              <div
                class="c4"
              >
                Label
              </div>
            </label>
          </div>
        </div>
      </div>
    `);
  });

  it('snapshots when the checkbox is checked and that is has a hint', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <Checkbox name="default-true" hint="Hello moto" onValueChange={() => undefined} value={true} id={2}>
            Label
          </Checkbox>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        margin: 0;
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
      }

      .c3:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:checked:after {
        content: '';
        display: block;
        position: relative;
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 10px;
        height: 10px;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c3:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:indeterminate:after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: #ffffff;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c5 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c4 {
        padding-left: 8px;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c2 * {
        cursor: default;
      }

      <div>
        <div>
          <div
            class="c0"
          >
            <label
              aria-describedby="field-hint-2"
              aria-invalid="false"
              class="c1 c2"
            >
              <input
                checked=""
                class="c3"
                id="field-2"
                name="default-true"
                type="checkbox"
              />
              <div
                class="c4"
              >
                Label
              </div>
            </label>
            <p
              class="c5"
              id="field-hint-2"
            >
              Hello moto
            </p>
          </div>
        </div>
      </div>
    `);
  });

  it('snapshots when the checkbox is checked and that is has an error', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <Checkbox name="default-true" error="Hello moto" onValueChange={() => undefined} value={true} id={2}>
            Label
          </Checkbox>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        margin: 0;
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
      }

      .c3:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:checked:after {
        content: '';
        display: block;
        position: relative;
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 10px;
        height: 10px;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c3:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c3:indeterminate:after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: #ffffff;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c3:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c3:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c0 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c0 > * + * {
        margin-top: 4px;
      }

      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c5 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #d02b20;
      }

      .c4 {
        padding-left: 8px;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c2 * {
        cursor: default;
      }

      <div>
        <div>
          <div
            class="c0"
          >
            <label
              aria-describedby="field-error-2"
              aria-invalid="true"
              class="c1 c2"
            >
              <input
                checked=""
                class="c3"
                id="field-2"
                name="default-true"
                type="checkbox"
              />
              <div
                class="c4"
              >
                Label
              </div>
            </label>
            <p
              class="c5"
              id="field-error-2"
            >
              Hello moto
            </p>
          </div>
        </div>
      </div>
    `);
  });
});
