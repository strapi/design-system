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
          <Checkbox name="default" onValueChange={() => undefined} value={undefined}>
            Label
          </Checkbox>
        </div>
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByRole('checkbox').getAttribute('name')).toBe('default'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
        background: #ffffff;
      }

      .c2:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c2:checked:after {
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

      .c2:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c2:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c2:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c2:indeterminate:after {
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

      .c2:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c2:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c0 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c3 {
        padding-left: 8px;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c1 * {
        cursor: default;
      }

      <div>
        <label
          class="c0 c1"
        >
          <input
            class="c2"
            name="default"
            type="checkbox"
          />
          <div
            class="c3"
          >
            Label
          </div>
        </label>
      </div>
    `);
  });

  it('snapshots when the checkbox is checked', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <Checkbox name="default-true" onValueChange={() => undefined} value={true}>
            Label
          </Checkbox>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
        background: #ffffff;
      }

      .c2:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c2:checked:after {
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

      .c2:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c2:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c2:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c2:indeterminate:after {
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

      .c2:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c2:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c0 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c3 {
        padding-left: 8px;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c1 * {
        cursor: default;
      }

      <div>
        <label
          class="c0 c1"
        >
          <input
            checked=""
            class="c2"
            name="default-true"
            type="checkbox"
          />
          <div
            class="c3"
          >
            Label
          </div>
        </label>
      </div>
    `);
  });
});
