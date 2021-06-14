import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BaseCheckbox } from '../BaseCheckbox';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('BaseCheckbox', () => {
  it('snapshots when the value is undefined (should have name=default)', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <label htmlFor="default">Parent</label>
          <BaseCheckbox name="default" onValueChange={() => undefined} value={undefined} />
        </div>
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByRole('checkbox').getAttribute('name')).toBe('default'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
        background: #ffffff;
      }

      .c0:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c0:checked:after {
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

      .c0:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c0:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c0:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c0:indeterminate:after {
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

      .c0:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c0:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      <div>
        <label
          for="default"
        >
          Parent
        </label>
        <input
          class="c0"
          name="default"
          type="checkbox"
        />
      </div>
    `);
  });

  it('snapshots when the checkbox is checked', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <label htmlFor="default-true">Parent</label>
          <BaseCheckbox name="default-true" onValueChange={() => undefined} value={true} />
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
        background: #ffffff;
      }

      .c0:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c0:checked:after {
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

      .c0:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c0:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c0:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c0:indeterminate:after {
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

      .c0:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c0:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      <div>
        <label
          for="default-true"
        >
          Parent
        </label>
        <input
          checked=""
          class="c0"
          name="default-true"
          type="checkbox"
        />
      </div>
    `);
  });
});
